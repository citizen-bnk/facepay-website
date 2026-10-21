'use client';
import Link from 'next/link';
import { Show, UserButton } from '@clerk/nextjs';

export function DeveloperNav() {
  return <div className="developer-nav"><div className="container-x"><Link href="/developers">FACEPAY DEVELOPERS</Link><nav aria-label="Developer account navigation"><a href="https://facepay-core.vercel.app/">API docs ↗</a><Show when="signed-in" fallback={<><Link href="/developers/sign-in">Sign in</Link><Link className="dev-nav-cta" href="/developers/sign-up">Create account</Link></>}><Link href="/developers/console">Developer console</Link><UserButton /></Show></nav></div></div>;
}
