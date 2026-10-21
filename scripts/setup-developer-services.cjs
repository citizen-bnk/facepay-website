/* Provision the existing connected sandbox. Never logs credentials. */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
require('@next/env').loadEnvConfig(process.cwd());
const { neon } = require('@neondatabase/serverless');
const Stripe = require('stripe');

async function main() {
  if (!process.env.DEVELOPER_DATABASE_URL || !process.env.STRIPE_SECRET_KEY) throw new Error('Connect Neon and Stripe first.');
  const db = neon(process.env.DEVELOPER_DATABASE_URL_UNPOOLED || process.env.DEVELOPER_DATABASE_URL);
  const migration = fs.readFileSync(path.join(process.cwd(), 'migrations/001_developer_programme.sql'), 'utf8');
  for (const statement of migration.split(';').map(s=>s.trim()).filter(Boolean)) await db.query(statement);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { maxNetworkRetries: 2 });
  const lookup = 'facepay_developer_annual_100_usd_v1';
  const existing = await stripe.prices.list({lookup_keys:[lookup],active:true,limit:1});
  let price = existing.data[0];
  if (!price) {
    const product = await stripe.products.create({name:'FacePay Developer Annual Membership',description:'Annual developer API membership. Sandbox payment API access.',metadata:{programme:'facepay_developer'}},{idempotencyKey:'facepay-developer-product-v1'});
    price = await stripe.prices.create({product:product.id,currency:'usd',unit_amount:10000,recurring:{interval:'year',interval_count:1},lookup_key:lookup},{idempotencyKey:'facepay-developer-price-v1'});
  }
  if (price.unit_amount!==10000 || price.currency!=='usd' || price.recurring?.interval!=='year') throw new Error('Existing price does not match approved annual terms.');
  const webhookUrl='https://facepay-website.vercel.app/api/developers/stripe-webhook';
  const endpoints=await stripe.webhookEndpoints.list({limit:100});
  let endpoint=endpoints.data.find(e=>e.url===webhookUrl); let secret=process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpoint) {
    endpoint=await stripe.webhookEndpoints.create({url:webhookUrl,enabled_events:['checkout.session.completed','checkout.session.async_payment_succeeded','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed'],description:'FacePay developer subscription lifecycle'});
    secret=endpoint.secret;
  }
  if (!secret) throw new Error('Webhook exists but its signing secret is unavailable. Restore the secret without creating another endpoint.');
  const portals=await stripe.billingPortal.configurations.list({limit:10});
  if (!portals.data.some(p=>p.is_default)) await stripe.billingPortal.configurations.create({business_profile:{headline:'Manage your FacePay developer membership'},features:{customer_update:{enabled:true,allowed_updates:['name','email']},invoice_history:{enabled:true},payment_method_update:{enabled:true},subscription_cancel:{enabled:true,mode:'at_period_end'}}});
  const values={STRIPE_DEVELOPER_PRICE_ID:price.id,STRIPE_WEBHOOK_SECRET:secret};
  const envFile=path.join(process.cwd(),'.env.local'); let env=fs.readFileSync(envFile,'utf8');
  for(const [name,value]of Object.entries(values)){env=env.replace(new RegExp('^'+name+'=.*\\r?\\n?','m'),'');env+='\n'+name+'='+JSON.stringify(value)+'\n';}
  fs.writeFileSync(envFile,env);
  if(process.env.VERCEL_CLI_PATH){
    for(const[name,value]of Object.entries(values)) {
      execFileSync(process.execPath,[process.env.VERCEL_CLI_PATH,'env','add',name,'production,preview','--project','facepay-website','--scope','smart-my-co','--yes','--force',...(name.includes('SECRET')?['--sensitive']:['--no-sensitive'])],{input:value+'\n',stdio:['pipe','pipe','pipe'],timeout:120000});
      console.log('Configured encrypted environment setting: '+name);
    }
    execFileSync(process.execPath,[process.env.VERCEL_CLI_PATH,'env','add','DEVELOPER_DATABASE_URL','production,preview','--project','facepay-core','--scope','smart-my-co','--yes','--force','--sensitive'],{input:process.env.DEVELOPER_DATABASE_URL+'\n',stdio:['pipe','pipe','pipe'],timeout:120000});
    console.log('Connected API key verification storage to facepay-core.');
  }
  console.log(JSON.stringify({migration:'001_developer_programme',priceId:price.id,amount:price.unit_amount,currency:price.currency,interval:price.recurring.interval,webhookId:endpoint.id,billingMode:price.livemode?'live':'test'}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
