import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export function GoldBtn({ href, children, ext }: { href: string; children: ReactNode; ext?: boolean }) {
  const cls = 'btn-gold';
  const inner = (<>{children}<ArrowRight size={16} aria-hidden /></>);
  return ext ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}
export function OutlineBtn({ href, children, ext }: { href: string; children: ReactNode; ext?: boolean }) {
  const cls = 'btn-outline';
  const inner = (<>{children}<ArrowRight size={16} aria-hidden /></>);
  return ext ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="btn-ghost">{children}<ArrowRight size={16} aria-hidden /></Link>;
}

export function PageHero({ eyebrow, title, gold, children, actions, aside }: { eyebrow?: string; title: string; gold?: string; children?: ReactNode; actions?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="hero-glow relative overflow-hidden pt-28 sm:pt-32">
      <div className="container-x grid items-center gap-10 pb-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="h-display text-4xl sm:text-5xl lg:text-[56px]">
            {title} {gold && <span className="gold-text">{gold}</span>}
          </h1>
          {children && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">{children}</p>}
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
        <div>{aside}</div>
      </div>
    </section>
  );
}

/** Swappable placeholder for photography. Replace by passing `src` (a local /public image). */
export function PhotoBlock({ label, caption, src, className = '', ratio = '4/3' }: { label: string; caption?: string; src?: string; className?: string; ratio?: string }) {
  return (
    <figure className={`photo-block rounded-xl ${className}`} style={{ aspectRatio: ratio }} data-swap-image="true">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      )}
      {!src && <span role="img" aria-label={`${label} (placeholder image)`} className="absolute inset-0" />}
      {!src && <svg aria-hidden viewBox="0 0 100 100" className="absolute left-1/2 top-[42%] h-1/3 -translate-x-1/2 -translate-y-1/2 text-gold-light/40" fill="currentColor">
        <circle cx="50" cy="34" r="16" /><path d="M16 92c0-22 15-36 34-36s34 14 34 36z" />
      </svg>}
      {caption !== undefined && (
        <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 to-transparent p-3 pt-8">
          <span className="block text-[11px] font-bold uppercase tracking-wider">{label}</span>
          {caption && <span className="block text-[11px] text-white/80">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function SectionHead({ eyebrow, title, gold, sub, center }: { eyebrow?: string; title: string; gold?: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-display text-3xl sm:text-4xl uppercase">
        {title} {gold && <span className="gold-text">{gold}</span>}
      </h2>
      {sub && <p className="mt-4 text-sm leading-relaxed text-white/80">{sub}</p>}
    </div>
  );
}

export function RingIcon({ children, size = 52 }: { children: ReactNode; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold-light" style={{ width: size, height: size }} aria-hidden>
      {children}
    </span>
  );
}
