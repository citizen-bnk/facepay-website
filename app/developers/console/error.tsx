'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="dev-console container-x"><h1>Developer workspace temporarily unavailable</h1><p>Your account is safe. Please retry while the registration and billing services reconnect.</p><button className="dev-button gold" onClick={reset}>Try again</button></section>}
