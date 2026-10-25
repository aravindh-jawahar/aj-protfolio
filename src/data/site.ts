export const site = {
  name: 'Aravindh Jawahar',
  title: 'AI product engineer',
  headline: 'I build AI products and the systems they run on',
  lead: 'RAG assistants, MCP servers and Rails/Nuxt platforms serving 100K+ daily users — owned from tech spec to production.',
  oneLiner:
    'I build AI features and the production systems they run on — RAG assistants, MCP servers and Rails/Nuxt platforms serving 100K+ daily users.',
  location: 'Chennai, India',
  email: 'j.aravindh@zohomail.com',
  linkedin: 'https://www.linkedin.com/in/aravindh-jawahar',
  github: 'https://github.com/aravindh-jawahar',
  resumePath: '/resume/Aravindh_Jawahar_Resume.pdf',
};

// Every number below is taken from the resume. Do not add figures that aren't there.
export const heroStats = [
  { value: '100K+', label: 'daily users on the platform I own' },
  { value: '6 years', label: 'shipping production software' },
  { value: '99.9%', label: 'uptime on event-driven services' },
];

export const impact = [
  { value: '300+', label: 'pages with JSON-LD schema for AI search' },
  { value: '25%', label: 'conversion uplift on key insurance products' },
  { value: '40%', label: 'faster page loads from Core Web Vitals work' },
];

export const strip = ['Ruby on Rails', 'Vue / Nuxt', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Claude API'];

export type ServiceIcon = 'ai' | 'stack' | 'pulse' | 'search';

export const services: { icon: ServiceIcon; title: string; text: string }[] = [
  {
    icon: 'ai',
    title: 'AI products',
    text: 'RAG assistants grounded in real product data, Claude API tool use, and MCP servers that let agents act safely.',
  },
  {
    icon: 'stack',
    title: 'Full-stack platforms',
    text: 'Rails APIs, Nuxt and React frontends, and Node services — owned end to end from tech spec to success metrics.',
  },
  {
    icon: 'pulse',
    title: 'Reliability & performance',
    text: 'Idempotent Kafka and Sidekiq consumers, memory fixes in production, and multi-layer caching at the edge.',
  },
  {
    icon: 'search',
    title: 'SEO & growth',
    text: 'Schema markup, SSR fixes for crawlers, A/B testing with GrowthBook, and lifecycle campaigns.',
  },
];
