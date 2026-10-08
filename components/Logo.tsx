import Image from 'next/image';
import Link from 'next/link';

export function Logo({ height = 44, href = '/' }: { height?: number; href?: string | null }) {
  const img = (
    <Image
      src="/logo-full.png"
      alt="FACEPAY - Face Your Money"
      width={Math.round(height * 4.346)}
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
