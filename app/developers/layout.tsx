import { ClerkProvider } from '@clerk/nextjs';
import { DeveloperNav } from '@/components/developers/DeveloperNav';

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider signInUrl="/developers/sign-in" signUpUrl="/developers/sign-up" signInFallbackRedirectUrl="/developers/console" signUpFallbackRedirectUrl="/developers/console" appearance={{ variables: { colorPrimary: '#D4AF37', borderRadius: '12px' } }}><DeveloperNav />{children}</ClerkProvider>;
}
