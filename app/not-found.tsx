import { GoldBtn } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="hero-glow pt-40 pb-24 text-center">
      <h1 className="h-display text-5xl">Page <span className="gold-text">not found</span></h1>
      <p className="mt-4 text-white/80">The page you are looking for does not exist.</p>
      <div className="mt-8 flex justify-center"><GoldBtn href="/">Back to home</GoldBtn></div>
    </section>
  );
}
