import Image from 'next/image';
import Link from 'next/link';

export function Logo({ height = 32, href = '/' }: { height?: number; href?: string | null }) {
  const img = (
    <Image
      src="/brand/facepay_logo_compact_dark.png"
      alt="FACEPAY — Face your money."
      width={Math.round(height * 5.279)}
      height={height}
      priority
      style={{ height, width: 'auto' }}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} aria-label="FACEPAY home" className="inline-block">
      {img}
    </Link>
  );
}
