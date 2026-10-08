import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple. Transparent. Built for growth. Illustrative plans for businesses, platforms and partners.',
  alternates: { canonical: '/pricing' },
};
const plans = [
  { n: 'Starter', s: 'For small businesses', p: 'R 499', per: 'per month', f: ['Up to 5 terminals', 'Basic reporting', 'Email support'], cta: 'Get Started', href: '/contact' },
  { n: 'Business', s: 'For growing companies', p: 'R 1,299', per: 'per month', f: ['Unlimited terminals', 'Advanced analytics', 'Priority support', 'All payment methods'], cta: 'Get Started', href: '/contact', pop: true },
  { n: 'Enterprise', s: "Let's talk", p: 'Custom', per: '', f: ['Tailored solutions', 'Dedicated support', 'SLA & compliance', 'Custom integrations'], cta: 'Contact Sales', href: '/contact' },
  { n: 'Platform / Partner', s: "Let's build together", p: 'Custom', per: '', f: ['API access', 'SDK & plugins', 'Technical support', 'Revenue partnership'], cta: 'Contact Us', href: '/contact' },
];
export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple. Transparent." gold="Built for Growth.">
        Illustrative plans only. Pricing is not verified and is subject to change; final commercial terms are agreed with our team.
      </PageHero>
      <section className="band py-10">
        <div className="container-x">
          <div className="light-panel p-5 sm:p-8">
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((p) => (
                <li key={p.n} className={`relative flex flex-col rounded-xl border p-5 ${p.pop ? 'border-gold bg-amber-50 ring-2 ring-gold' : 'border-slate-200'}`}>
                  {p.pop && <span className="absolute right-3 top-3 rounded bg-gold-grad px-2 py-0.5 text-[10px] font-bold text-[#1a1203]">Most Popular</span>}
                  <h2 className="text-sm font-bold">{p.n}</h2>
                  <p className="text-xs text-slate-600">{p.s}</p>
                  <p className="mt-4 text-3xl font-extrabold">{p.p}</p>
                  <p className="min-h-[1rem] text-xs text-slate-600">{p.per}</p>
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
