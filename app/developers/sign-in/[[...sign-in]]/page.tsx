import { SignIn } from '@clerk/nextjs';
export default function SignInPage() { return <section className="dev-auth"><div><p className="dev-eyebrow">FACEPAY DEVELOPER PROGRAMME</p><h1>Welcome back.</h1><p>Sign in to manage your API keys, annual subscription and integrations.</p></div><SignIn routing="path" path="/developers/sign-in" /></section>; }
