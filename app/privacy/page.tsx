import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy & Biometric Consent',
  description: 'How FACEPAY approaches privacy, POPIA and explicit biometric consent.',
  alternates: { canonical: '/privacy' },
};
const sections: [string, string[]][] = [
  ['Explicit, revocable consent', ['Biometric enrolment only starts after you accept the terms and give explicit consent for a stated purpose.', 'You can review and revoke consent in the app or portal at any time, and request deletion of your biometric data.']],
  ['What we do and do not keep', ['Biometric templates are treated as highly sensitive and are protected with strong encryption and purpose-specific matching tokens.', 'Raw face images are not shown in support screens or ordinary logs, and FACEPAY never converts face data into card NFC credentials.', 'Card data stays with certified payment partners and token services.']],
  ['POPIA', ['We aim to apply South African POPIA principles: lawful purpose, necessity, retention limits, operator contracts and data-subject requests. Biometric processing is subject to local legal review.']],
  ['Status of this notice', ['This is an illustrative notice for a concept-stage product. It is not legal advice. FACEPAY is not a bank and does not claim licensing or regulatory approval; payments are processed via authorised partners.']],
];
export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy &" gold="Biometric Consent">Your face, your choice. Plain-language notice on how consent-based biometric payments work.</PageHero>
      <section className="band py-10">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map(([h, ps]) => (
            <div key={h}><h2 className="text-lg font-bold text-gold-light">{h}</h2>{ps.map((p) => <p key={p} className="mt-2 text-sm leading-relaxed text-white/85">{p}</p>)}</div>
          ))}
          <p className="text-xs text-slate2">Contact our information officer through the <a className="underline" href="/contact">contact page</a>.</p>
        </div>
      </section>
    </>
  );
}
