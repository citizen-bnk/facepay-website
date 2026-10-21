/* End-to-end verification uses reserved Clerk emails and Stripe test credentials only. */
const assert=require('node:assert/strict');
const {randomBytes}=require('node:crypto');
const {chromium}=require('playwright-core');
const {createClerkClient}=require('@clerk/backend');
const Stripe=require('stripe');
const {neon}=require('@neondatabase/serverless');
require('@next/env').loadEnvConfig(process.cwd());
async function main(){
 assert.ok(process.env.CLERK_SECRET_KEY?.startsWith('sk_test_'),'Clerk test instance required');
 assert.ok(process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_'),'Stripe test instance required');
 const clerk=createClerkClient({secretKey:process.env.CLERK_SECRET_KEY});
 const token=await clerk.testingTokens.createTestingToken();
 const email=`facepay-e2e-${Date.now()}+clerk_test@example.com`;
 const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
 const db=neon(process.env.DEVELOPER_DATABASE_URL);
 const browser=await chromium.launch({executablePath:process.env.FACEPAY_E2E_CHROMIUM_PATH || process.env.LOCALAPPDATA+'/ms-playwright/chromium-1248/chrome-win64/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.setDefaultTimeout(30000);
 await page.route('**.clerk.accounts.dev/**',async route=>{const url=new URL(route.request().url());url.searchParams.set('__clerk_testing_token',token.token);await route.continue({url:url.href})});
 try{
 await page.goto('https://facepay-website.vercel.app/developers/sign-up');
 await page.locator('input[name=emailAddress]').fill(email);
 await page.locator('input[name=password]').fill('FacePay-Test-'+randomBytes(20).toString('hex')+'!');
 const verificationReady=page.waitForResponse(r=>r.url().includes('/prepare_verification') && r.request().method()==='POST' && r.ok(),{timeout:45000});
 await page.getByRole('button',{name:'Continue',exact:true}).click();
 await verificationReady;
 
 const otp=page.locator('input[autocomplete=one-time-code]');
 await otp.first().pressSequentially('424242',{delay:80});
 await page.waitForURL(url=>url.pathname==='/developers/console',{timeout:45000,waitUntil:'domcontentloaded'});
 console.log('PASS automated signup and email verification');
 const before=await page.request.post('https://facepay-website.vercel.app/api/developers/keys',{headers:{origin:'https://facepay-website.vercel.app'},data:{name:'E2E verification'}});
 assert.equal(before.status(),402);console.log('PASS unpaid account cannot issue keys');
 await page.getByRole('button',{name:'Subscribe · US$100 / year'}).click();
 await page.waitForURL('https://checkout.stripe.com/**',{timeout:45000});
 console.log('PASS authenticated annual checkout opened');
 await page.locator('#payment-method-label-card').locator('xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " AccordionItem ")][1]').click();
 await page.screenshot({path:'../../outputs/facepay-preview/developer-checkout-test.png',fullPage:true});
 await page.locator('#cardNumber').fill('4242424242424242');
 await page.locator('#cardExpiry').fill('1234');
 await page.locator('#cardCvc').fill('123');
 await page.locator('#billingName').fill('FacePay Automated Test');
 await page.locator('#billingCountry').selectOption('ZA');
 if(await page.locator('#billingPostalCode').isVisible())await page.locator('#billingPostalCode').fill('2000');
 await page.getByRole('button',{name:'Subscribe',exact:true}).click();
 await page.waitForURL('**/developers/console?checkout=success',{timeout:60000});
 console.log('PASS Stripe test checkout completed and returned to developer console');
 const users=await clerk.users.getUserList({emailAddress:[email]});const user=users.data[0];
 const [account]=await db`SELECT * FROM developer_accounts WHERE user_id=${user.id}`;
 assert.equal(account.subscription_status,'active');assert.equal(account.billing_mode,'test');
 const subscription=await stripe.subscriptions.retrieve(account.stripe_subscription_id,{expand:['latest_invoice']});
 assert.equal(subscription.currency,'usd');assert.equal(subscription.items.data[0].price.unit_amount,10000);assert.equal(subscription.latest_invoice.status,'paid');
 console.log('PASS paid annual subscription is exactly US$100');
 const headers={origin:'https://facepay-website.vercel.app'};
 const issue=()=>page.request.post('https://facepay-website.vercel.app/api/developers/keys',{headers,data:{name:'E2E verification'}});
 const issued=await issue();assert.equal(issued.status(),201);const key=await issued.json();
 const [stored]=await db`SELECT key_hash FROM developer_api_keys WHERE id=${key.id}`;assert.notEqual(stored.key_hash,key.key);assert.equal(stored.key_hash,require('node:crypto').createHash('sha256').update(key.key).digest('hex'));
 console.log('PASS key issued after payment; only its hash is stored');
 async function createIntent(apiKey,merchantId){return fetch('https://facepay-core.vercel.app/v1/payment-intents',{method:'POST',headers:{authorization:'Bearer '+apiKey,'content-type':'application/json','Idempotency-Key':randomBytes(16).toString('hex')},body:JSON.stringify({merchantId,amountMinor:12500,currency:'ZAR'})})}
 const allowed=await createIntent(key.key,account.tenant_id);assert.equal(allowed.status,201);
 const denied=await createIntent(key.key,'m_abc');assert.equal(denied.status,403);
 console.log('PASS developer key works only for its own merchant');
 const revoked=await page.request.delete('https://facepay-website.vercel.app/api/developers/keys',{headers,data:{id:key.id}});assert.equal(revoked.status(),200);
 assert.equal((await createIntent(key.key,account.tenant_id)).status,401);console.log('PASS revoked key is rejected immediately');
 const secondResponse=await issue();assert.equal(secondResponse.status(),201);const secondKey=await secondResponse.json();
 await stripe.subscriptions.cancel(account.stripe_subscription_id);
 let webhookSeen=false;
 for(let i=0;i<20;i++){const events=await stripe.events.list({type:'customer.subscription.deleted',limit:10});const event=events.data.find(e=>e.data.object.id===account.stripe_subscription_id);if(event){const rows=await db`SELECT event_id FROM developer_billing_events WHERE event_id=${event.id}`;if(rows.length){webhookSeen=true;break}}await new Promise(r=>setTimeout(r,2000))}
 assert.ok(webhookSeen,'Stripe cancellation webhook must reach the production endpoint');
 assert.equal((await createIntent(secondKey.key,account.tenant_id)).status,402);
 console.log('PASS real Stripe sandbox webhook disables access after cancellation');
 await page.reload();await page.screenshot({path:'../../outputs/facepay-preview/developer-test-console.png',fullPage:true});

 }catch(error){console.log('Failed step page:',new URL(page.url()).pathname);console.log((await page.locator('body').innerText()).slice(0,2200));await page.screenshot({path:'../../outputs/facepay-preview/developer-flow-failure.png',fullPage:true});throw error;}finally{
 try { const found=await clerk.users.getUserList({emailAddress:[email]});
 for(const user of found.data){const rows=await db`SELECT stripe_customer_id FROM developer_accounts WHERE user_id=${user.id}`;if(rows[0]?.stripe_customer_id){const subs=await stripe.subscriptions.list({customer:rows[0].stripe_customer_id,status:'all'});for(const sub of subs.data)if(sub.status!=='canceled')await stripe.subscriptions.cancel(sub.id);await stripe.customers.del(rows[0].stripe_customer_id)}await db`DELETE FROM developer_api_usage WHERE key_id IN (SELECT id FROM developer_api_keys WHERE user_id=${user.id})`;await db`DELETE FROM developer_api_keys WHERE user_id=${user.id}`;await db`DELETE FROM developer_checkout_attempts WHERE user_id=${user.id}`;await db`DELETE FROM developer_accounts WHERE user_id=${user.id}`;await clerk.users.deleteUser(user.id)}
 console.log('Test identity and billing records cleaned up'); } finally { await browser.close(); }
 }
}
main().catch(e=>{console.error('Verification failed:',e.message);process.exitCode=1});


