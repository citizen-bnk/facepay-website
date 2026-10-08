import type { Metadata } from 'next';
import { PageHero, GoldBtn, OutlineBtn, PhotoBlock } from '@/components/ui';
import { PhoneMockup } from '@/components/Devices';
import { APP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'For Everyday Life',
  description: 'Pay with just your face at shops, transport, restaurants, healthcare, fuel stations and online.',
  alternates: { canonical: '/personal' },
};
const uses = [
  ['Shops & Retail', 'Pay in stores'], ['Transport', 'Buses, trains, taxis'], ['Restaurants', 'Dine and pay'],
  ['Healthcare', 'Clinics & pharmacies'], ['Fuel', 'At the pump'], ['Online', 'Shop anywhere'],
];
export default function Personal() {
  return (
    <>
      <PageHero
        title="For Everyday Life."
        gold="Pay with Just Your Face."
        actions={<><GoldBtn href={APP_URL} ext>Download the App</GoldBtn><OutlineBtn href="/privacy">How consent works</OutlineBtn></>}
        aside={<div className="relative flex justify-center"><PhoneMockup /><p className="eyebrow absolute right-0 top-8 hidden text-right normal-case !tracking-wide italic text-gold-light sm:block">One App.<br />Everyday.<br />Everywhere.</p></div>}
      >
        From shops to transport, restaurants to healthcare, FACEPAY makes payments simple, secure and seamless across South Africa and beyond. Face payments are always consent-based and you stay in control.
      </PageHero>
      <section className="band">
        <div className="container-x py-10">
          <h2 className="sr-only">Where you can pay</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {uses.map(([t, d]) => (
              <li key={t}><PhotoBlock label={t} caption={d} ratio="3/4" /></li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-slate2">Acceptance locations are illustrative; availability depends on merchant and partner onboarding.</p>
        </div>
      </section>
    </>
  );
}
