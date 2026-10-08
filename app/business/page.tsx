import type { Metadata } from 'next';
import { Users, QrCode, LineChart, ShieldCheck, TrendingUp } from 'lucide-react';
import { PageHero, GoldBtn, OutlineBtn, PhotoBlock } from '@/components/ui';

export const metadata: Metadata = {
  title: 'For Businesses',
  description: 'Accept payments, grow revenue and empower your customers with fast, secure and flexible payment solutions.',
  alternates: { canonical: '/business' },
};
const feats = [
  [Users, 'Easy Onboarding', 'Get started in minutes'], [QrCode, 'All Payment Methods', 'Cards, QR, Face & more'],
  [LineChart, 'Real-Time Analytics', 'Track and grow'], [ShieldCheck, 'Enterprise Security', 'Built with security-first principles'],
  [TrendingUp, 'Business Growth', 'Tools & insights'],
] as const;
const bars = [30, 45, 38, 55, 48, 62, 70, 66, 82, 90];
export default function Business() {
  return (
    <>
      <PageHero
        title="For Businesses"
        gold="That Move Africa Forward."
        actions={<><GoldBtn href="/contact">Get Started for Business</GoldBtn><OutlineBtn href="/contact">Talk to Sales</OutlineBtn></>}
        aside={<PhotoBlock label="Merchant photo" ratio="16/10" className="max-w-lg ml-auto" />}
      >
        Accept payments. Grow revenue. Empower your customers with fast, secure and flexible payment solutions.
      </PageHero>
      <section className="band">
        <div className="container-x py-10">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {feats.map(([I, t, d]) => (
              <li key={t} className="text-center"><I size={30} className="mx-auto text-gold-light" aria-hidden /><h3 className="mt-2 text-xs font-bold">{t}</h3><p className="text-xs text-white/75">{d}</p></li>
            ))}
          </ul>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]" aria-label="Merchant dashboard preview">
            <div className="light-panel p-5">
              <p className="text-xs text-slate-500">Total Payments (demo data)</p>
              <p className="text-3xl font-extrabold">R 254,920.00</p>
              <p className="text-xs font-semibold text-emerald-700">+12% this month</p>
              <div className="mt-4 flex h-32 items-end gap-2" role="img" aria-label="Bar chart of monthly payments, rising">
                {bars.map((h, i) => <span key={i} className="flex-1 rounded-t bg-gold-grad" style={{ height: `${h}%` }} />)}
              </div>
            </div>
            <div className="light-panel p-5">
              <p className="text-sm font-bold">Recent Transactions</p>
              <ul className="mt-3 divide-y divide-slate-200 text-xs">
                {[['Card Payment', 'Today, 10:14 AM', '+R 125.00'], ['FacePay', 'Today, 09:17 AM', '+R 89.00'], ['QR Payment', 'Today, 08:42 AM', '+R 64.00']].map(([a, b, c]) => (
                  <li key={a} className="flex justify-between py-2.5"><span><b className="block text-sm">{a}</b><span className="text-slate-500">{b}</span></span><b className="self-center text-sm">{c}</b></li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate2">Dashboard preview uses illustrative demo data.</p>
        </div>
      </section>
    </>
  );
}
