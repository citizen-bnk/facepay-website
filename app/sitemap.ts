import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';

const paths = ['', '/personal', '/solutions', '/business', '/pricing', '/developers', '/hardware', '/about', '/contact', '/privacy'];
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
