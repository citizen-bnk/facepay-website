import type { Metadata } from 'next';
import { Calculator, ShoppingCart, Store, Bus, FileText, Landmark, Wallet, Building2, Code2 } from 'lucide-react';
import { PageHero, GoldBtn, OutlineBtn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Solutions & Integrations',
  description: 'One platform. Every payment. Across people, platforms and places. POS, e-commerce, transport, banking APIs and more.',
  alternates: { canonical: '/solutions' },
};
const items = [
  [Calculator, 'POS Integration', 'Retail, restaurants, hospitality and more.'],
  [ShoppingCart, 'E-commerce Plugins', 'Online stores and marketplaces.'],
  [Store, 'Merchant Payments', 'In-store and online, accept payments.'],
  [Bus, 'Transport & Mobility', 'Buses, trains, taxis and parking.'],
  [FileText, 'Bills & Utilities', 'Electricity, water, internet, TV and more.'],
  [Landmark, 'Banking APIs', 'Open banking and financial services via authorised partners.'],
  [Wallet, 'Digital Wallets', 'Cards, bank accounts and e-money.'],
  [Building2, 'Government & Public Services', 'Licences, permits and citizen services.'],
  [Code2, 'Developer SDK / API', 'Integrate FACEPAY into your platform.'],
] as const;
export default function Solutions() {
  return (
    <>
      <PageHero eyebrow="Our solutions" title="Built for" gold="Integration.">
        One platform. Every payment. Across people, platforms and places. FACEPAY connects consent-based identity verification to authorised payment partners.
      </PageHero>
      <section className="band py-10">
        <div className="container-x">
          <div className="light-panel p-5 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(([I, t, d]) => (
                <li key={t} className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-grad text-[#1a1203]"><I size={24} aria-hidden /></span>
                  <div><h3 className="text-sm font-bold">{t}</h3><p className="mt-1 text-xs leading-relaxed text-slate-600">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GoldBtn href="/developers">Explore the APIs</GoldBtn>
            <OutlineBtn href="/contact">Talk to Sales</OutlineBtn>
          </div>
        </div>
      </section>
    </>
  );
}
