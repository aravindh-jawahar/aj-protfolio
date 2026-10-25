// Mirrors the RAG assistant described on the resume; keep it to what was actually built.
export const pipeline = [
  { title: 'Sources', text: 'Product content, FAQs and guides' },
  { title: 'Chunk & embed', text: 'Chunking and vector embeddings' },
  { title: 'pgvector', text: 'Semantic retrieval in PostgreSQL' },
  { title: 'Hybrid router', text: 'Retrieval for knowledge, tool calls for live fees and promos' },
  { title: 'Claude', text: 'Claude API with an MCP tool layer for live product data' },
  { title: 'Guardrails', text: 'Answers grounded in retrieved sources' },
  { title: 'Streamed answer', text: 'Streaming APIs with Redis caching' },
];

export const aiCards = [
  {
    title: 'Agents & MCP',
    points: [
      'MCP servers exposing live Singapore and Hong Kong product data to LLMs.',
      'A TypeScript Sidekiq ops MCP server with scoped, blast-radius-limited actions.',
      'Claude API tool layer for channels, product mapping and product details.',
    ],
  },
  {
    title: 'AI workflows',
    points: [
      'n8n workflows that write SEO meta titles and descriptions from live product data.',
      'Length, keyword and claim validation, then human review before publishing.',
      'LangGraph + n8n automation for support and content across team repos.',
    ],
  },
  {
    title: 'AI-native development',
    points: [
      'Claude Code daily for agentic, multi-repo development.',
      'Prompt engineering for grounded, source-cited answers.',
      'GitHub Copilot alongside Claude Code in the editor.',
    ],
  },
];
