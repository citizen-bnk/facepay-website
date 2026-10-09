'use client';
import {useState} from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  { n: 'Starter', s: 'For small businesses', p: 'R 499', per: 'per month', f: ['Up to 5 terminals', 'Basic reporting', 'Email support'], cta: 'Get Started', href: '/contact' },
  { n: 'Business', s: 'For growing companies', p: 'R 1,299', per: 'per month', f: ['Unlimited terminals', 'Advanced analytics', 'Priority support', 'All payment methods'], cta: 'Get Started', href: '/contact', pop: true },
  { n: 'Enterprise', s: "Let's talk", p: 'Custom', per: '', f: ['Tailored solutions', 'Dedicated support', 'SLA & compliance', 'Custom integrations'], cta: 'Contact Sales', href: '/contact' },
  { n: 'Platform / Partner', s: "Let's build together", p: 'Custom', per: '', f: ['API access', 'SDK & plugins', 'Technical support', 'Revenue partnership'], cta: 'Contact Us', href: '/contact' },
];
export default function PricingPlans() {
  const [annual,setAnnual]=useState(false);
  return (
    <>
      <div className="reference-pricing-title reference-section-title"><p>Pricing</p><h1>Simple. Transparent. Built for Growth.</h1><div className="pricing-billing"><div role="group" aria-label="Billing period"><button aria-pressed={!annual} onClick={()=>setAnnual(false)}>Monthly</button><button aria-pressed={annual} onClick={()=>setAnnual(true)}>Yearly</button><span>Save 20%</span></div><p>{annual?"Monthly equivalent, billed yearly. Illustrative prices only.":"Choose your plan for businesses, platforms and partners."}</p></div></div>
      <section className="reference-light pb-12 pt-0">
        <div className="container-x">
          <div className="light-panel p-5 sm:p-8">
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((p) => (
                <li key={p.n} className={`relative flex flex-col rounded-xl border p-5 ${p.pop ? 'border-gold bg-amber-50 ring-2 ring-gold' : 'border-slate-200'}`}>
                  {p.pop && <span className="absolute right-3 top-3 rounded bg-gold-grad px-2 py-0.5 text-[10px] font-bold text-[#1a1203]">Most Popular</span>}
                  <h2 className="text-sm font-bold">{p.n}</h2>
                  <p className="text-xs text-slate-600">{p.s}</p>
                  <p className="mt-4 text-3xl font-extrabold">{annual&&p.per?(p.n==='Starter'?'R 399.20':'R 1,039.20'):p.p}</p>
                  <p className="min-h-[1rem] text-xs text-slate-600">{p.per && (annual?'per month, billed yearly':p.per)}</p>
                  <ul className="my-5 flex-1 space-y-2 text-xs">
                    {p.f.map((x) => <li key={x} className="flex gap-2"><Check size={14} className="shrink-0 text-amber-700" aria-hidden />{x}</li>)}
                  </ul>
                  <Link href={p.href} className={p.pop ? 'btn-gold' : 'btn border border-slate-300 text-[#0b1220] hover:bg-slate-100'}>{p.cta}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-600">All prices in ZAR, excluding VAT, illustrative and unverified. Transaction fees, hardware and provider charges are quoted separately.</p>
          </div>
        </div>
      </section>
    </>
  );
}
