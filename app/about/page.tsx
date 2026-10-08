import type { Metadata } from 'next';
import { ShieldCheck, ScanFace, Users, Globe } from 'lucide-react';
import { PageHero, GoldBtn, PhotoBlock } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About',
  description: 'FACEPAY: powering a more inclusive South Africa with consent-based, integration-first payments.',
  alternates: { canonical: '/about' },
};
const vals = [[ShieldCheck, 'Secure'], [ScanFace, 'Convenient'], [Users, 'Inclusive'], [Globe, 'Everywhere']] as const;
export default function About() {
  return (
    <>
      <PageHero eyebrow="About FACEPAY" title="Powering a More Inclusive" gold="South Africa.">
        From cities to towns, from everyday people to big businesses, FACEPAY connects communities through smarter payments. FACEPAY is an integration layer connecting consent-based identity verification to authorised payment partners. It is not a bank and makes no claim of banking licensing or regulatory approval.
      </PageHero>
      <section className="band py-10">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <PhotoBlock label="Our team and community" ratio="16/9" />
          <div>
            <ul className="grid grid-cols-2 gap-4">
              {vals.map(([I, t]) => (
                <li key={t} className="gold-frame flex items-center gap-3 p-4"><I className="text-gold-light" size={26} aria-hidden /><span className="text-sm font-bold uppercase tracking-wide">{t}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/85">Trusted by people, businesses and platforms is our goal. Our approach: bank-grade security practices, privacy by design under POPIA, scalable infrastructure and built for South Africa. Compliance and partner status are confirmed as each is achieved.</p>
            <div className="mt-6"><GoldBtn href="/contact">Get in touch</GoldBtn></div>
          </div>
        </div>
      </section>
    </>
  );
}
