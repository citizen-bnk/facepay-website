'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { NAV } from '@/lib/config';

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo height={40} />
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => {
            const active = path === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 py-1 text-[13px] font-medium transition hover:text-gold-light ${active ? 'border-gold text-white' : 'border-transparent text-white/85'}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-gold hidden !min-h-[40px] !px-5 !py-2 sm:inline-flex">
            Request a Demo
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-x lg:hidden">
          <div className="rounded-2xl border border-gold/30 bg-midnight/95 p-4 backdrop-blur">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold mt-2 w-full">Request a Demo</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
