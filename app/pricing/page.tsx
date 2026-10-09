import type {Metadata} from 'next';
import PricingPlans from '@/components/PricingPlans';
export const metadata:Metadata={title:'Pricing',description:'Simple. Transparent. Built for growth. Illustrative plans for businesses, platforms and partners.',alternates:{canonical:'/pricing'}};
export default function Pricing(){return <PricingPlans/>}
