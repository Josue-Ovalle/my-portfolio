// Core data types
export interface PersonalInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone?: string;
  availability: string;
  social: SocialLinks;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
  behance: string;
}

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  experience: string;
  projects: number;
}

export type SkillCategory = 
  | 'frontend' 
  | 'styling' 
  | 'language' 
  | 'backend' 
  | 'animation' 
  | 'design' 
  | 'optimization' 
  | 'marketing';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  features: string[];
  price: string;
  timeline: string;
  ideal_for: string;
}

export type IconName = 
  | 'Code2' 
  | 'Palette' 
  | 'Zap' 
  | 'ShoppingCart' 
  | 'Settings'
  | 'Globe'
  | 'Brain'
  | 'TrendingUp';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  process: string[];
  solution: string;
  results: ProjectResults;
  image: string;
  gallery: string[];
  technologies: string[];
  category: ProjectCategory;
  demoUrl: string;
  caseStudyUrl: string;
  featured: boolean;
  timeline: string;
  teamSize: string;
  year: string;
  testimonial?: ProjectTestimonial;
}

export type ProjectCategory = 
  | 'ecommerce' 
  | 'saas' 
  | 'healthcare' 
  | 'restaurant' 
  | 'portfolio'
  | 'landing'
  | 'blog'
  | 'component';

export interface ProjectResults {
  primary: string;
  metrics: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  project: string;
  metrics: string;
  featured: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlights: string[];
}

// Component Props Types
export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  isLoaded: boolean;
}

export interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  ripple?: boolean;
  className?: string;
  disabled?: boolean;
  'data-cursor-text'?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareEffect?: boolean;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  showSkeleton?: boolean;
  aspectRatio?: AspectRatio;
}

export type AspectRatio = 'square' | '4/3' | '16/9' | '3/2' | 'auto';

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface FormValidationRule {
  required?: boolean | string;
  email?: string;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: (value: string) => string | undefined;
}

export interface FormValidationRules {
  [key: string]: FormValidationRule;
}

export interface UseFormReturn<T = Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: string) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => Promise<void>;
  reset: () => void;
  setValue: (name: keyof T, value: string) => void;
  setFieldError: (name: keyof T, error: string) => void;
  isValid: boolean;
  isDirty: boolean;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  required?: boolean;
  className?: string;
}

// API Types
export interface ContactAPIRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface ContactAPIResponse {
  success?: boolean;
  error?: string;
  message?: string;
  timestamp: string;
  details?: Record<string, string>;
  retryAfter?: number;
  blocked?: boolean;
  code?: string;
}

export interface RateLimitInfo {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
  blocked?: boolean;
}

// Animation Types
export interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
  staggerDelay?: number;
}

export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  hasAnimated: boolean;
  controls: string;
}

export interface ParallaxOptions {
  speed?: number;
  offset?: number;
}

export interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

// SEO Types
export interface StructuredDataPerson {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image: object;
  sameAs: string[];
  jobTitle: string;
  worksFor: object;
  address: object;
  email: string;
  telephone?: string;
  knowsAbout: string[];
}

export interface StructuredDataWebsite {
  "@context": string;
  "@type": string;
  "@id": string;
  url: string;
  name: string;
  description: string;
  publisher: object;
  potentialAction: object;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

// Utility Types
export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithOptionalChildren<T = {}> = T & {
  children?: React.ReactNode;
};

// Event Handler Types
export type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type KeyHandler = (event: React.KeyboardEvent) => void;

// Hook Return Types
export interface UseClickOutsideReturn {
  ref: React.RefObject<HTMLElement>;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

// Component Ref Types
export type ButtonRef = React.RefObject<HTMLButtonElement>;
export type InputRef = React.RefObject<HTMLInputElement>;
export type DivRef = React.RefObject<HTMLDivElement>;

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  brand: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  accent: {
    electric: string;
    purple: string;
    green: string;
    orange: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

// Performance Types
export interface WebVitals {
  CLS: number;
  FID: number;
  FCP: number;
  LCP: number;
  TTFB: number;
}

export interface PerformanceMetrics extends WebVitals {
  timestamp: number;
  url: string;
  userAgent: string;
}

// Environment Types
export interface EnvironmentVariables {
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  TO_EMAIL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Metadata Types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

// Animation Variant Types
export interface MotionVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

export interface SpringConfig {
  type: 'spring';
  damping: number;
  stiffness: number;
  mass?: number;
}

export interface TransitionConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

// Generic utility types for better type safety
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Status Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type RequestStatus = 'pending' | 'fulfilled' | 'rejected';

// Component State Types
export interface ComponentState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends ComponentState<T> {
  status: LoadingState;
  lastUpdated: number | null;
}

// File Upload Types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

// Search/Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'date' | 'title' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  role?: string;
  tabIndex?: number;
}

// Export all types for easier importing
export type * from './index';