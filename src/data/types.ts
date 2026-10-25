export type StackColour = 'ruby' | 'node' | 'python';

export interface DetailGroup {
  heading?: string;
  points: string[];
}

export interface Role {
  id: string;
  company: string;
  location: string;
  role: string;
  badge: string;
  colour: StackColour;
  /** 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM'; null = present */
  end: string | null;
  summary?: string;
  stack: string[];
  details: DetailGroup[];
}

export interface Degree {
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface StackGroup {
  name: string;
  items: string[];
  featured?: boolean;
}
