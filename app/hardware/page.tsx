import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { PageHero, GoldBtn } from '@/components/ui';
import { DeviceIllustration, type DeviceKind } from '@/components/Devices';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Hardware',
  description: 'FACEPAY POS with screen, tap module, kiosk and handheld terminal. Illustrative designs for retail, transport, hospitality and field use.',
  alternates: { canonical: '/hardware' },
};
const devices: { k: DeviceKind; n: string; d: string }[] = [
  { k: 'pos', n: 'POS with Screen', d: 'Countertop terminal with customer display and face-capture module for retail and hospitality.' },
  { k: 'tap', n: 'Tap Module', d: 'Compact NFC and QR attachment that adds FACEPAY to an existing POS.' },
  { k: 'kiosk', n: 'Kiosk', d: 'Self-service stand for transport hubs, clinics, fuel forecourts and public services.' },
  { k: 'handheld', n: 'Handheld', d: 'Mobile terminal for field staff, delivery, queues and events.' },
];
export default function Hardware() {
  return (
    <>
      <PageHero eyebrow="Buy FACEPAY hardware" title="Built for Merchants." gold="Ready for What's Next.">
        Secure, elegant devices that bring biometric payments to the real world. Device designs are illustrative: specifications, certification status and pricing are not yet verified.
      </PageHero>
      <section className="band py-10">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {devices.map((d) => (
              <li key={d.k} className="gold-frame p-5">
                <DeviceIllustration kind={d.k} className="mx-auto w-full max-w-[260px]" />
                <h2 className="mt-2 text-base font-bold">{d.n}</h2>
                <p className="mt-1 text-xs leading-relaxed text-white/80">{d.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="h-display text-2xl uppercase">Made for <span className="gold-text">every environment</span></h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {['Retail', 'Transport', 'Hospitality', 'Field use'].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={18} className="text-gold" aria-hidden />{x}</li>)}
              </ul>
              <ul className="mt-5 space-y-1.5 text-xs text-white/85">
                {['Fast, contactless face payments', 'Supports QR, NFC and cards', 'Easy integration with your systems', 'Reliable, scalable and future-ready'].map((x) => <li key={x}>• {x}</li>)}
              </ul>
              <p className="mt-4 text-xs text-slate2">No raw biometrics are stored on devices. Payments are only shown as complete after provider confirmation.</p>
              <div className="mt-5"><GoldBtn href="#hw-enquiry">Enquire about hardware</GoldBtn></div>
            </div>
            <div id="hw-enquiry" className="gold-frame scroll-mt-24 p-6">
              <h2 className="mb-4 text-lg font-bold">Hardware enquiry</h2>
              <LeadForm defaultKind="hardware" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
