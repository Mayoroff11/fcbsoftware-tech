export interface VideoItem {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  verificationUrl: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category: string;
  specs: string[];
}

export interface LicensePlan {
  id: string;
  durationId: string;
  durationName: string;
  type: 'personal' | 'business';
  title: string;
  price: string;
  periodLabel: string;
  description: string;
  features: string[];
  ctaText: string;
  recommended?: boolean;
}

export interface DurationGroup {
  id: string;
  name: string;
  personal: LicensePlan;
  business: LicensePlan;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingDetail: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  tierBadge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  institution: string;
  date: string;
  quote: string;
  rating: number;
  useCase: string;
}

export type ActiveModal = 'license' | 'support' | 'docs' | null;
