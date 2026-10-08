import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Contact & Demo Request',
  description: "Let's build a more connected South Africa. Request a demo, ask a question or explore a partnership.",
  alternates: { canonical: '/contact' },
};
export default function Contact() {
  return (
    <section className="hero-glow pt-28 sm:pt-32">
      <div className="container-x grid gap-10 pb-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="h-display text-4xl sm:text-5xl">Let&apos;s Build<br />a More Connected<br /><span className="gold-text">South Africa.</span></h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">Get a demo, ask a question or explore a partnership. Our team is here to help.</p>
          <p className="mt-6 italic text-gold-light">Payments for a Brighter Tomorrow.</p>
        </div>
        <div className="gold-frame p-6 sm:p-8"><LeadForm /></div>
      </div>
    </section>
  );
}
