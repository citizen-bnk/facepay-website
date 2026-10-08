export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.facepay.com';
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.facepay.com';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://facepay.com';

export const NAV = [
  { href: '/personal', label: 'Personal' },
  { href: '/business', label: 'Business' },
  { href: '/developers', label: 'Developers' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/hardware', label: 'Hardware' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const;

export const ILLUSTRATIVE =
  'Illustrative concept. Pricing, hardware and screens shown are not verified and may change.';
