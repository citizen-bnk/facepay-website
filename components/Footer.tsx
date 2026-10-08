import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import { Logo } from './Logo';

const links = [
  ['/', 'Home'],
  ['/personal', 'For Individuals'],
  ['/business', 'For Merchants'],
  ['/solutions', 'Integrations'],
  ['/about', 'About'],
  ['/contact', 'Support'],
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy & Biometric Consent'],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-ink">
      <div className="container-x py-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Logo height={34} />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80">
            {links.map(([h, l]) => (
              <Link key={l} href={h} className="hover:text-gold-light">{l}</Link>
            ))}
          </nav>
          <div className="flex gap-4 text-white/80">
            {[[Linkedin, 'LinkedIn'], [Instagram, 'Instagram'], [Youtube, 'YouTube'], [Twitter, 'X']].map(([Icon, n]) => {
              const I = Icon as typeof Linkedin;
              return <span key={n as string} role="img" aria-label={`${n as string} (link coming soon)`}><I size={16} /></span>;
            })}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate2 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            FACEPAY is an integration layer connecting consent-based identity verification to authorised payment partners. FACEPAY is not a bank and
            does not claim any banking licence or regulatory approval. Pricing, hardware and screens shown are illustrative concepts and are not verified.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} FACEPAY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
