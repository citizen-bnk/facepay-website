import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { requireDeveloper, mutationOrigin, developerError, developerDb, DeveloperError } from '@/lib/developers/account';
import { requireMembership } from '@/lib/developers/billing';
const scopes = ['payment_intents:create','payment_intents:read','payment_intents:confirm','verification:create','transactions:read','merchants:read','customers:read','devices:read','merchant:dashboard','integrations:read','webhooks:write'];
export async function POST(request: Request) { try {
  mutationOrigin(request); const account = await requireMembership(await requireDeveloper());
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 80) throw new DeveloperError(422,'invalid_name','Give the API key a name of 1–80 characters.');
  const db=developerDb();
  const key='fp_sandbox_'+randomBytes(32).toString('base64url'); const hash=createHash('sha256').update(key).digest('hex');
  const result=await db.transaction([
    db`SELECT user_id FROM developer_accounts WHERE user_id=${account.user_id} FOR UPDATE`,
    db`INSERT INTO developer_api_keys(id,user_id,name,key_hash,key_prefix,scopes,expires_at)
    SELECT ${randomUUID()},${account.user_id},${body.name.trim()},${hash},${key.slice(0,19)},${scopes},now()+interval '365 days'
    WHERE (SELECT count(*) FROM developer_api_keys WHERE user_id=${account.user_id} AND revoked_at IS NULL AND expires_at>now()) < 5 RETURNING id,key_prefix,expires_at`,
  ]);
  const rows=result[1];
  if (!rows.length) throw new DeveloperError(409,'key_limit','Revoke an old key before creating another. Five active keys are allowed.');
  return Response.json({ ...rows[0], key, scopes, environment:'sandbox', message:'Copy this key now. Only its hash is stored.' },{status:201,headers:{'Cache-Control':'no-store'}});
} catch(error) { return developerError(error); } }
export async function DELETE(request: Request) { try {
  mutationOrigin(request); const account=await requireDeveloper(false); const body=await request.json().catch(()=>null);
  if (!body || typeof body.id !== 'string') throw new DeveloperError(422,'invalid_key','API key ID is required.');
  const rows=await developerDb()`UPDATE developer_api_keys SET revoked_at=now() WHERE id=${body.id} AND user_id=${account.user_id} AND revoked_at IS NULL RETURNING id`;
  if (!rows.length) throw new DeveloperError(404,'not_found','Active API key not found.');
  return Response.json({revoked:true},{headers:{'Cache-Control':'no-store'}});
} catch(error) { return developerError(error); } }
