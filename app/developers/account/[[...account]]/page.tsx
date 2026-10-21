import { auth } from '@clerk/nextjs/server';
import { UserProfile } from '@clerk/nextjs';
export default async function AccountPage() { await auth.protect(); return <section className="dev-account"><h1>Developer account</h1><UserProfile routing="path" path="/developers/account" /></section>; }
