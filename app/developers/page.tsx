import type { Metadata } from 'next';
import { Webhook, Boxes, Puzzle, FlaskConical, LifeBuoy, Smartphone, Cpu, Landmark } from 'lucide-react';
import { PageHero, GoldBtn, OutlineBtn } from '@/components/ui';
import { CodeTabs } from '@/components/CodeTabs';
import { PORTAL_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Developers',
  description: 'Build the future of payments with FACEPAY REST APIs, SDKs, plugins and a sandbox.',
  alternates: { canonical: '/developers' },
};
const kit = [
  [Webhook, 'REST APIs', 'Simple & powerful'], [Boxes, 'SDKs', 'iOS, Android, Web'], [Puzzle, 'Plugins', 'E-commerce & POS'],
  [FlaskConical, 'Sandbox', 'Test & build'], [LifeBuoy, 'Developer Support', 'Docs & community'],
] as const;
const arch = [[Smartphone, 'Your App / Platform'], [Cpu, 'FACEPAY API'], [Boxes, 'Payment Hardware'], [Landmark, 'Banks & Networks']] as const;
export default function Developers() {
  return (
    <>
      <PageHero
        title="Build the Future"
        gold="of Payments."
        actions={<><GoldBtn href={PORTAL_URL} ext>View Documentation</GoldBtn><OutlineBtn href="/contact">Join Developer Program</OutlineBtn></>}
      >
        Integrate FACEPAY into your platform with our powerful APIs, SDKs and developer tools. Examples are illustrative; endpoints follow the published API reference.
      </PageHero>
      <section className="band py-10">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {kit.map(([I, t, d]) => (
              <li key={t} className="text-center"><I size={28} className="mx-auto text-gold-light" aria-hidden /><h3 className="mt-2 text-xs font-bold">{t}</h3><p className="text-xs text-white/75">{d}</p></li>
            ))}
          </ul>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <CodeTabs />
            <div className="light-panel p-5">
              <h2 className="text-sm font-bold">System Architecture</h2>
              <ol className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col xl:flex-row">
                {arch.map(([I, t], i) => (
                  <li key={t} className="flex items-center gap-2 text-center">
                    <span className="flex flex-col items-center gap-1 text-[11px] font-semibold"><I size={28} className="text-amber-700" aria-hidden />{t}</span>
                    {i < arch.length - 1 && <span aria-hidden className="text-amber-700">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
