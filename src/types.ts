export type TabType = 
  | 'overview' 
  | 'rights' 
  | 'commons' 
  | 'ai-shift' 
  | 'climate-energy' 
  | 'local-roles' 
  | 'case-studies' 
  | 'simulator' 
  | 'calculator' 
  | 'quiz';

export interface PrincipleItem {
  number: number;
  title: string;
  enTitle?: string;
  summary: string;
  description: string;
  actionPoint: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  category: 'domestic' | 'international';
  location: string;
  countryOrRegion: string;
  title: string;
  type: string;
  keyStats: { label: string; value: string }[];
  description: string;
  modelDetails: string[];
  takeaway: string;
  badge: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
