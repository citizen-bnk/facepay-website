import Image from 'next/image';
import { Wifi, Wallet, ArrowLeftRight, FileText, Clock, MoreHorizontal, ScanFace, Home, QrCode, User, Nfc } from 'lucide-react';

/** Phone mockup built in CSS/React using the real logo. Demo data only. */
export function PhoneMockup({ variant = 'home', className = '' }: { variant?: 'home' | 'wallet'; className?: string }) {
  const tiles = [
    [ScanFace, 'Pay'], [ArrowLeftRight, 'Transfer'], [FileText, 'Bills'],
    [Wallet, 'Wallet'], [Clock, 'History'], [MoreHorizontal, 'More'],
  ] as const;
  return (
    <div
      role="img"
      aria-label="FACEPAY app screen mockup (illustrative)"
      className={`relative aspect-[9/17] w-[250px] rounded-[38px] border-[3px] border-[#3a3326] bg-black p-[7px] shadow-[0_30px_70px_-20px_rgba(0,0,0,.9),0_0_0_1px_rgba(212,165,58,.5),0_0_50px_-10px_rgba(212,165,58,.35)] ${className}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[30px] bg-gradient-to-b from-[#0c1630] to-[#060c1a] px-3.5 pb-3 pt-2 text-white">
        <div className="relative flex items-center justify-between text-[8px] font-semibold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-0 h-[14px] w-[58px] -translate-x-1/2 rounded-full bg-black" />
          <Wifi size={9} />
        </div>
        <div className="mt-3 flex justify-center">
          <Image src="/logo-full.png" alt="" width={110} height={25} />
        </div>
        {variant === 'home' ? (
          <>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.05] p-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-grad text-[10px] font-bold text-black">T</span>
              <div className="leading-tight">
                <p className="text-[9px] font-bold">Welcome Back</p>
                <p className="text-[7px] text-white/70">Thabo - more possibilities</p>
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {tiles.map(([I, l]) => (
                <div key={l} className="flex flex-col items-center gap-1 rounded-lg border border-gold/25 bg-white/[0.04] py-2.5">
                  <I size={15} className="text-gold-light" aria-hidden />
                  <span className="text-[7px]">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-gold/35 bg-gold/10 p-2">
              <ScanFace size={18} className="text-gold-light" aria-hidden />
              <div className="leading-tight">
                <p className="text-[8px] font-bold">Pay with your face</p>
                <p className="text-[6.5px] text-white/70">Fast. Secure. Contactless.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-[8px] text-white/70">Available balance (via provider)</p>
            <p className="text-lg font-extrabold">R 12,450.00</p>
            <div className="mt-2 space-y-1.5">
              {['Pick n Pay  -R 245.00', 'Uber  -R 120.00', 'Received from Sipho  +R 500.00', 'Netflix  -R 199.00', 'Engen  -R 640.00'].map((r) => (
                <div key={r} className="rounded-lg bg-white/[0.06] px-2 py-2 text-[8px]">{r}</div>
              ))}
            </div>
          </>
        )}
        <div className="mt-auto flex justify-between pt-3 text-[6.5px] text-white/60">
          {[[Home, 'Home'], [Wallet, 'Wallet'], [QrCode, 'Pay'], [Clock, 'Activity'], [User, 'Profile']].map(([I, l]) => {
            const Ic = I as typeof Home;
            return (
              <span key={l as string} className={`flex flex-col items-center gap-0.5 ${l === 'Home' ? 'text-gold-light' : ''}`}>
                <Ic size={12} aria-hidden />{l as string}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Counter-top tablet / terminal on a stand ("Tap - Face - Pay"). */
export function TabletStand({ className = '', width = 300 }: { className?: string; width?: number }) {
  return (
    <div
      role="img"
      aria-label="FACEPAY countertop terminal (illustrative)"
      className={`relative ${className}`}
      style={{ width, height: width * 1.15, perspective: 900 }}
    >
      <div className="absolute inset-x-[8%] bottom-0 top-[14%] bg-gradient-to-b from-[#1b1710] to-black" style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)', transform: 'translateZ(-30px)' }} />
      <div
        className="absolute inset-x-0 top-0 h-[88%] rounded-[22px] border-[3px] border-[#7a6130] bg-black p-2 shadow-[0_30px_60px_-20px_#000,0_0_40px_-10px_rgba(212,165,58,.5)]"
        style={{ transform: 'rotateY(-16deg) rotateX(3deg)', transformOrigin: 'center' }}
      >
        <div className="flex h-full flex-col items-center justify-center rounded-[16px] bg-gradient-to-b from-[#0d1530] to-[#050810] text-center">
          <Image src="/icon-mark.png" alt="" width={90} height={71} />
          <p className="mt-1 text-lg font-extrabold tracking-wide">FACE<span className="gold-text">PAY</span></p>
          <p className="text-[7px] tracking-[0.3em] text-white/70">FACE YOUR MONEY</p>
          <Nfc size={34} className="mt-5 text-gold-light" aria-hidden />
          <p className="mt-2 text-[11px] text-white/85">Tap · Face · Pay</p>
        </div>
      </div>
    </div>
  );
}

const Defs = () => (
  <defs>
    <linearGradient id="dk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a2d36" /><stop offset="1" stopColor="#0b0d12" /></linearGradient>
    <linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F2CE6B" /><stop offset=".5" stopColor="#D4A53A" /><stop offset="1" stopColor="#B8862B" /></linearGradient>
    <linearGradient id="sc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#101a36" /><stop offset="1" stopColor="#060a16" /></linearGradient>
  </defs>
);
const Mark = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke="url(#gd)" strokeWidth="5" strokeLinecap="round">
    <path d="M0 24V6h20M0 14h14" />
    <path d="M26 8a14 14 0 0 1 0 18M33 3a22 22 0 0 1 0 28" />
  </g>
);

export type DeviceKind = 'pos' | 'tap' | 'kiosk' | 'handheld';
/** Illustrative device renders in SVG. */
export function DeviceIllustration({ kind, className = '' }: { kind: DeviceKind; className?: string }) {
  const label: Record<DeviceKind, string> = {
    pos: 'POS with screen', tap: 'Tap module', kiosk: 'Kiosk', handheld: 'Handheld terminal',
  };
  return (
    <svg viewBox="0 0 320 260" role="img" aria-label={`${label[kind]} illustration (illustrative)`} className={className}>
      <Defs />
      <ellipse cx="160" cy="238" rx="110" ry="9" fill="#000" opacity=".5" />
      {kind === 'pos' && (
        <g>
          <path d="M60 232 L90 150 H230 L262 232 Z" fill="url(#dk)" stroke="#3a3326" />
          <rect x="70" y="78" width="180" height="116" rx="12" fill="url(#dk)" stroke="url(#gd)" strokeWidth="2" />
          <rect x="80" y="88" width="160" height="96" rx="6" fill="url(#sc)" />
          <circle cx="160" cy="124" r="20" fill="none" stroke="#3fbf7f" strokeWidth="4" />
          <path d="M150 124l7 8 14-16" fill="none" stroke="#3fbf7f" strokeWidth="4" strokeLinecap="round" />
          <text x="160" y="164" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">R 245.00</text>
          <rect x="95" y="40" width="130" height="40" rx="10" fill="url(#dk)" stroke="url(#gd)" strokeWidth="1.5" />
          <circle cx="160" cy="60" r="9" fill="#050810" stroke="#8cb4ff" strokeWidth="1.5" />
          <Mark x={106} y={50} s={0.5} />
        </g>
      )}
      {kind === 'tap' && (
        <g>
          <rect x="95" y="70" width="130" height="150" rx="22" fill="url(#dk)" stroke="url(#gd)" strokeWidth="2" />
          <rect x="106" y="82" width="108" height="74" rx="12" fill="url(#sc)" />
          <Mark x={136} y={100} s={1.1} />
          <g fill="none" stroke="url(#gd)" strokeWidth="3.5" strokeLinecap="round">
            <path d="M144 190a22 22 0 0 1 32 0" /><path d="M134 180a36 36 0 0 1 52 0" /><path d="M124 170a50 50 0 0 1 72 0" />
          </g>
          <circle cx="160" cy="203" r="4" fill="url(#gd)" />
        </g>
      )}
      {kind === 'kiosk' && (
        <g>
          <rect x="140" y="120" width="40" height="104" fill="url(#dk)" />
          <rect x="100" y="222" width="120" height="12" rx="6" fill="url(#dk)" stroke="#3a3326" />
          <rect x="82" y="22" width="156" height="108" rx="12" fill="url(#dk)" stroke="url(#gd)" strokeWidth="2" />
          <rect x="92" y="32" width="136" height="88" rx="6" fill="url(#sc)" />
          <Mark x={140} y={48} s={1} />
          <text x="160" y="104" textAnchor="middle" fontSize="10" fill="#fff">Look to pay</text>
          <circle cx="160" cy="27" r="2.5" fill="#8cb4ff" />
        </g>
      )}
      {kind === 'handheld' && (
        <g>
          <rect x="112" y="30" width="96" height="196" rx="18" fill="url(#dk)" stroke="url(#gd)" strokeWidth="2" />
          <rect x="120" y="44" width="80" height="92" rx="8" fill="url(#sc)" />
          <Mark x={142} y={62} s={0.9} />
          <text x="160" y="116" textAnchor="middle" fontSize="8" fill="#fff">Tap · Face · Pay</text>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={124 + (i % 3) * 26} y={146 + Math.floor(i / 3) * 18} width="20" height="12" rx="4" fill="#1d2230" />
          ))}
          <rect x="112" y="30" width="96" height="10" rx="5" fill="#000" opacity=".5" />
        </g>
      )}
    </svg>
  );
}
