export type StackColour = 'ruby' | 'node' | 'python' | 'neutral';

export interface DetailGroup {
  heading?: string;
  points: string[];
}

export interface Span {
  id: string;
  label: string;
  parentId: string | null;
  /** 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM', inclusive; null = present */
  end: string | null;
  stackColour: StackColour;
  yearsOnly?: boolean;
  stack?: string[];
  summary?: string;
  details: DetailGroup[];
}

export interface StackGroup {
  name: string;
  items: string[];
}
