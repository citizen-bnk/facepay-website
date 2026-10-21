import { requireDeveloper, mutationOrigin, developerError } from '@/lib/developers/account';
import { checkout } from '@/lib/developers/billing';
export async function POST(request: Request) { try { mutationOrigin(request); return Response.json({ url: await checkout(await requireDeveloper()) }, { headers: { 'Cache-Control':'no-store' } }); } catch(error) { return developerError(error); } }
