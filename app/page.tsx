import type { Metadata } from 'next';
import {
  ShieldCheck, Zap, Users, Network, ScanFace, Fingerprint, Store, TabletSmartphone, Code2, CreditCard,
  ShoppingCart, Bus, Coffee, Truck, Landmark, Globe, Building2, CheckCircle2, Calculator, Quote,
} from 'lucide-react';
import { PhoneMockup, TabletStand } from '@/components/Devices';
import { GoldBtn, OutlineBtn, TextLink, RingIcon, PhotoBlock } from '@/components/ui';
import { APP_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: { absolute: 'FACEPAY | One Identity. Many Ways to Pay.' },
  alternates: { canonical: '/' },
};

const strip = [
  [ShieldCheck, 'Secure', 'Your identity. Your money. Protected.'],
  [Zap, 'Fast', 'Pay in seconds. Built for real life.'],
  [Users, 'Inclusive', 'A fairer, more accessible payment ecosystem.'],
  [Network, 'Integration-ready', 'Connects people, merchants, software and hardware.'],
] as const;

const tiles = [
  [ScanFace, 'App-Based Payments', 'Pay, transfer, buy, manage your money with your face.'],
  [Fingerprint, 'Biometric Convenience', 'Fast. Secure. No cards needed.'],
  [Store, 'Merchant Acceptance', 'From retail to transport and beyond.'],
  [TabletSmartphone, 'Hardware Deployment', 'Purpose-built devices for any environment.'],
  [Code2, 'Software Integration', 'Works with existing systems and new platforms.'],
  [CreditCard, 'Multiple Payment Methods', 'QR, NFC, cards and linked accounts in one platform.'],
] as const;

const eco = [
  [Store, 'Merchants', 'Retail, F&B and more'],
  [Calculator, 'POS Systems', 'Seamless integration'],
  [Landmark, 'Banks & Financial Institutions', ''],
  [TabletSmartphone, 'Mobile Apps', 'Expand your platform'],
  [Globe, 'Online Platforms', 'E-commerce & services'],
  [Bus, 'Transport', 'Transit & mobility'],
  [Building2, 'Public Services', 'For a more inclusive society'],
] as const;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-glow relative overflow-hidden pt-28 sm:pt-32">
        <div className="dots-face pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] opacity-60 xl:block" aria-hidden />
        <div className="container-x relative grid items-center gap-8 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[1.3fr_1fr_0.4fr]">
          <div>
            <h1 className="h-display text-[34px] sm:text-5xl xl:text-[54px]">
              One Identity.<br /><span className="gold-text whitespace-nowrap">Many Ways to Pay.</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/90">
              FACEPAY is an integration platform connecting people, merchants, software and hardware across payment ecosystems — for a smarter, more inclusive tomorrow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GoldBtn href={APP_URL} ext>Download the App</GoldBtn>
              <OutlineBtn href="/hardware">Buy FACEPAY Hardware</OutlineBtn>
            </div>
            <div className="mt-4"><TextLink href="/contact">Request a Demo</TextLink></div>
          </div>
          <div className="relative mx-auto flex min-h-[420px] w-full max-w-[560px] items-end justify-center sm:min-h-[500px]">
            <PhoneMockup className="relative z-10 -mr-6 scale-[0.9] sm:scale-100" />
            <TabletStand width={270} className="relative -ml-2 hidden sm:block" />
          </div>
          <div className="hidden xl:block">
            <p className="eyebrow !tracking-[0.5em] leading-8 text-white/80">PEOPLE<br />PAYMENTS<br />POSSIBILITIES</p>
            <div className="mt-3 h-0.5 w-10 bg-gold" />
          </div>
        </div>
        <div className="border-t border-gold/25 bg-black/30">
          <ul className="container-x grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {strip.map(([I, t, d]) => (
              <li key={t} className="flex items-center gap-4">
                <RingIcon><I size={24} /></RingIcon>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">{t}</p>
                  <p className="text-xs text-white/80">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="band" aria-labelledby="why-h">
        <div className="container-x grid gap-8 py-10 lg:grid-cols-[1.1fr_3fr] lg:items-center">
          <div>
            <p className="eyebrow mb-2">Why FACEPAY</p>
            <h2 id="why-h" className="h-display text-3xl uppercase">More than<br />a <span className="gold-text">payment app</span></h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              FACEPAY brings together biometric convenience, secure payments, and seamless integration — connecting people, merchants, software and hardware across the entire payment ecosystem.
            </p>
            <div className="mt-4"><OutlineBtn href="/solutions">Learn More</OutlineBtn></div>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-gold/20 md:grid-cols-3 xl:grid-cols-6">
            {tiles.map(([I, t, d]) => (
              <li key={t} className="bg-midnight p-5 text-center">
                <I size={34} className="mx-auto text-gold-light" aria-hidden />
                <h3 className="mt-3 text-[13px] font-bold">{t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GET THE APP + HARDWARE */}
      <section className="band">
        <div className="container-x grid gap-4 py-6 lg:grid-cols-2">
          <div className="gold-frame relative overflow-hidden p-6 sm:p-8">
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="text-2xl font-extrabold uppercase">Get the app</h2>
                <p className="mt-1 text-sm font-semibold text-gold-light">Your Money. Your Face. More Possibilities.</p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">Pay, transfer, buy, settle bills and access more with just your face. A secure, fast and inclusive way to manage your money.</p>
                <ul className="mt-4 space-y-1.5 text-xs">
                  {['Pay in seconds with your face', 'Transfer to friends and family', 'Pay bills and top up services', 'Secure digital wallet', 'Access more with your identity'].map((x) => (
                    <li key={x} className="flex gap-2"><CheckCircle2 size={14} className="mt-px shrink-0 text-gold" aria-hidden />{x}</li>
                  ))}
                </ul>
                <div className="mt-5"><GoldBtn href={APP_URL} ext>Download the App</GoldBtn></div>
              </div>
              <div className="flex justify-center overflow-hidden">
                <PhoneMockup variant="wallet" className="origin-top scale-[0.9]" />
              </div>
            </div>
          </div>
          <div className="gold-frame relative overflow-hidden p-6 sm:p-8">
            <div className="grid items-center gap-4 sm:grid-cols-[1.2fr_1fr_auto]">
              <div>
                <h2 className="text-2xl font-extrabold uppercase">Buy FACEPAY hardware</h2>
                <p className="mt-1 text-sm font-semibold text-gold-light">Built for Merchants. Ready for What&apos;s Next.</p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">Our secure, elegant devices bring biometric payments to the real world — from retail and transport to hospitality and field operations.</p>
                <ul className="mt-4 space-y-1.5 text-xs">
                  {['Fast, contactless face payments', 'Supports QR, NFC and cards', 'Easy integration with your systems', 'Ideal for retail, transport, hospitality and more', 'Reliable, scalable and future-ready'].map((x) => (
                    <li key={x} className="flex gap-2"><CheckCircle2 size={14} className="mt-px shrink-0 text-gold" aria-hidden />{x}</li>
                  ))}
                </ul>
                <div className="mt-5"><GoldBtn href="/hardware">Buy FACEPAY Hardware</GoldBtn></div>
              </div>
              <div className="hidden justify-center sm:flex"><TabletStand width={190} /></div>
              <ul className="grid grid-cols-2 gap-2 text-[11px] font-semibold uppercase tracking-wider sm:grid-cols-1">
                {[[ShoppingCart, 'Retail'], [Bus, 'Transport'], [Coffee, 'Hospitality'], [Truck, 'Field use']].map(([I, l]) => {
                  const Ic = I as typeof Bus;
                  return <li key={l as string} className="flex items-center gap-2 border-gold/25 sm:border-b sm:py-2.5"><Ic size={22} className="text-gold-light" aria-hidden />{l as string}</li>;
                })}
              </ul>
            </div>
            <p className="mt-4 text-[11px] text-slate2">Hardware shown is illustrative and not yet verified or certified.</p>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="band" aria-labelledby="eco-h">
        <div className="container-x grid gap-6 py-8 lg:grid-cols-[1fr_3fr] lg:items-center">
          <div>
            <p className="eyebrow mb-2">Built to connect</p>
            <h2 id="eco-h" className="h-display text-2xl uppercase">Works across<br />the payment ecosystem</h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {eco.map(([I, t, d]) => (
              <li key={t} className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center">
                <I size={26} className="mx-auto text-gold-light" aria-hidden />
                <p className="mt-2 text-[11px] font-bold leading-tight">{t}</p>
                {d && <p className="mt-1 text-[10px] text-white/75">{d}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REAL PEOPLE */}
      <section className="band" aria-labelledby="people-h">
        <div className="container-x grid gap-5 py-6 lg:grid-cols-[1.1fr_3fr_1.1fr] lg:items-stretch">
          <div className="self-center">
            <h2 id="people-h" className="h-display text-3xl uppercase">Real people.<br />Real <span className="gold-text">possibilities.</span></h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">From everyday payments to life&apos;s bigger moments, FACEPAY is making money simpler, faster and more inclusive for everyone.</p>
            <div className="mt-4"><OutlineBtn href="/about">Our Stories</OutlineBtn></div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <PhotoBlock label="Retail" caption="Pay with ease." ratio="3/4" />
            <PhotoBlock label="Cafes" caption="Everyday moments." ratio="3/4" />
            <PhotoBlock label="Transport" caption="On the move." ratio="3/4" />
            <PhotoBlock label="Everyday life" caption="A more inclusive tomorrow." ratio="3/4" />
          </div>
          <figure className="gold-frame flex flex-col justify-center p-5">
            <Quote className="text-gold" size={26} aria-hidden />
            <blockquote className="mt-2 text-sm leading-relaxed">FacePay makes my life easier — fast, secure and works everywhere I go.</blockquote>
            <figcaption className="mt-3 text-right text-[11px] text-slate2">— A Real User, South Africa<br />(illustrative testimonial)</figcaption>
          </figure>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-gold/25" aria-labelledby="cta-h"
        style={{ background: 'radial-gradient(80% 160% at 20% 120%, rgba(212,165,58,.45), transparent 55%), radial-gradient(60% 100% at 50% 130%, rgba(120,170,255,.25), transparent 60%), #050810' }}>
        <div className="container-x grid items-center gap-6 py-12 text-center lg:grid-cols-[1fr_auto_1fr]">
          <span />
          <div>
            <h2 id="cta-h" className="text-3xl font-extrabold">Ready to start with FACE<span className="gold-text">PAY</span>?</h2>
            <p className="mt-2 text-sm text-white/85">Join a smarter, more inclusive payment ecosystem.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <GoldBtn href={APP_URL} ext>Download the App</GoldBtn>
              <OutlineBtn href="/hardware">Buy FACEPAY Hardware</OutlineBtn>
            </div>
          </div>
          <p className="eyebrow hidden !tracking-[0.5em] leading-8 text-white/80 lg:block lg:text-right">SAME<br />IDENTITY.<br />A BRIGHTER<br />TOMORROW.</p>
        </div>
      </section>
    </>
  );
}
