export interface LabObject {
  id: string
  label: string
  icon: string
  description: string
  category: 'projects' | 'skills' | 'personality' | 'navigation' | 'contact' | 'meta'
  content: LabObjectContent
  position: { x: number; y: number }
}

export interface ProjectContent {
  type: 'projects'
  items: {
    title: string
    problem: string
    experiment: string
    result: string
    tags: string[]
  }[]
}

export interface SkillsContent {
  type: 'skills'
  domains: {
    name: string
    tools: string[]
    projects: string[]
  }[]
}

export interface PersonalityContent {
  type: 'personality'
  entries: { label: string; value: string }[]
}

export interface QuotesContent {
  type: 'quotes'
  items: string[]
}

export interface ContactContent {
  type: 'contact'
  links: { label: string; url: string; icon: string }[]
}

export interface StatusContent {
  type: 'status'
  current: string
}

export interface InterestsContent {
  type: 'interests'
  items: string[]
}

export interface MetaContent {
  type: 'meta'
  stack: string[]
}

export type LabObjectContent =
  | ProjectContent
  | SkillsContent
  | PersonalityContent
  | QuotesContent
  | ContactContent
  | StatusContent
  | InterestsContent
  | MetaContent

export const labObjects: LabObject[] = [
  {
    id: 'monitors',
    label: 'Dual Monitors',
    icon: '🖥️',
    description: 'Projects & Experiments',
    category: 'projects',
    position: { x: 45, y: 30 },
    content: {
      type: 'projects',
      items: [
        {
          title: 'Voicemail Transcription Pipeline',
          problem: 'Multi-language voicemails needed real-time, accurate transcription across 6+ country formats with wildly different accents.',
          experiment: 'Combined Faster Whisper for speech-to-text with Qwen for intelligent language detection and post-processing. Built a pipeline that handles Australian English without breaking.',
          result: 'Production system processing voicemails in real-time with high accuracy across multiple languages. Still tuning — the last 10% takes 2 months.',
          tags: ['Faster Whisper', 'Qwen', 'Python', 'Speech Processing', 'Docker'],
        },
        {
          title: 'AI Financing Eligibility Engine',
          problem: 'Manual review of customer financing eligibility was slow, inconsistent, and bottlenecking the business.',
          experiment: 'Built an AI system that evaluates customer profiles against complex eligibility criteria using LLMs for nuanced decision-making.',
          result: '40% reduction in manual review time. More consistent decisions. The system handles edge cases that rule-based systems miss.',
          tags: ['LLMs', 'Python', 'Risk Analysis', 'REST API', 'PostgreSQL'],
        },
        {
          title: 'Document Extraction Engine',
          problem: 'Unstructured PDFs, invoices, and contracts needed structured data extraction at scale with high accuracy.',
          experiment: 'Integrated Docling for layout parsing, Moondream for visual understanding, and Claude API for intelligent extraction and validation.',
          result: 'Handles varied document formats with high accuracy. From messy PDFs to clean structured JSON.',
          tags: ['Docling', 'Moondream', 'Claude API', 'OCR', 'TypeScript'],
        },
        {
          title: 'N8n Automation Workflows',
          problem: '60% of data processing workflows were manual — copy-paste between systems, manual data entry, repetitive formatting.',
          experiment: 'Architected end-to-end automation using N8n connecting CRM, document processing, notifications, and data pipelines.',
          result: '60% reduction in manual processing. Systems that run themselves. More time for building, less time for clicking.',
          tags: ['N8n', 'REST APIs', 'Webhooks', 'Node.js', 'Automation'],
        },
      ],
    },
  },
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    icon: '📋',
    description: 'System Designs & Thinking',
    category: 'skills',
    position: { x: 20, y: 20 },
    content: {
      type: 'skills',
      domains: [
        {
          name: 'Architecture Thinking',
          tools: ['System Design', 'Pipeline Architecture', 'Data Flow Modeling', 'API Design'],
          projects: ['Voicemail Pipeline', 'Document Extraction', 'N8n Workflows'],
        },
      ],
    },
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf',
    icon: '📚',
    description: 'Skill Domains',
    category: 'skills',
    position: { x: 10, y: 40 },
    content: {
      type: 'skills',
      domains: [
        {
          name: 'LLMs & Language Models',
          tools: ['Llama', 'Qwen', 'DeepSeek', 'Claude API', 'Prompt Engineering', 'Fine-tuning'],
          projects: ['Financing Engine', 'Document Extraction'],
        },
        {
          name: 'Data Pipelines',
          tools: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'ETL', 'Data Modeling'],
          projects: ['All projects — data flows through everything'],
        },
        {
          name: 'Speech Processing',
          tools: ['Faster Whisper', 'Qwen Audio', 'Diarization', 'Audio Preprocessing'],
          projects: ['Voicemail Transcription'],
        },
        {
          name: 'Automation',
          tools: ['N8n', 'REST APIs', 'Webhooks', 'Cron Jobs', 'Event-driven Architecture'],
          projects: ['N8n Workflows', 'Document Processing'],
        },
        {
          name: 'Web Development',
          tools: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS'],
          projects: ['This portfolio!', 'Internal dashboards'],
        },
      ],
    },
  },
  {
    id: 'robot',
    label: 'Byte (Robot Pet)',
    icon: '🤖',
    description: 'Chat with AI Abhinay',
    category: 'navigation',
    position: { x: 70, y: 65 },
    content: { type: 'status', current: 'Opens the AI Chat' },
  },
  {
    id: 'coffee',
    label: 'Coffee Mug',
    icon: '☕',
    description: 'Personality & Vibes',
    category: 'personality',
    position: { x: 55, y: 35 },
    content: {
      type: 'personality',
      entries: [
        { label: 'Fueled by', value: 'Chai & deadlines' },
        { label: 'Currently reading', value: 'Designing Data-Intensive Applications' },
        { label: 'Currently vibing to', value: 'Lo-fi beats + Bollywood throwbacks' },
        { label: 'Hot take', value: 'Most "AI products" are just wrappers around API calls. Build the pipeline, not the wrapper.' },
      ],
    },
  },
  {
    id: 'window',
    label: 'Window',
    icon: '🌃',
    description: 'Read My Story',
    category: 'navigation',
    position: { x: 30, y: 10 },
    content: { type: 'status', current: 'Opens the Story mode' },
  },
  {
    id: 'terminal-screen',
    label: 'CRT Monitor',
    icon: '🖵',
    description: 'Enter Terminal Mode',
    category: 'navigation',
    position: { x: 80, y: 25 },
    content: { type: 'status', current: 'Opens the Terminal' },
  },
  {
    id: 'poster',
    label: 'Wall Poster',
    icon: '🖼️',
    description: 'Quotes & Mantras',
    category: 'personality',
    position: { x: 50, y: 8 },
    content: {
      type: 'quotes',
      items: [
        'I used to work incredibly hard but aimlessly — now I aim.',
        'Ship it, then fix it.',
        "If it's not automated, it's not done.",
        'The demo works in 2 days. The last 10% takes 2 months.',
        "I don't just use AI tools — I experiment obsessively with them.",
        "Most engineers pick one stack. I try everything, break things, then build something better.",
        'Building things is the best way to learn.',
        "Sometimes things break. That's the point.",
      ],
    },
  },
  {
    id: 'headphones',
    label: 'Headphones',
    icon: '🎧',
    description: 'Currently Building',
    category: 'personality',
    position: { x: 60, y: 28 },
    content: {
      type: 'status',
      current: 'Building AI systems at ASBL — voicemail processing, document extraction, and financing engines. Always experimenting with open-source LLMs on the side.',
    },
  },
  {
    id: 'plant',
    label: 'Desk Plant',
    icon: '🌿',
    description: 'Interests & Life',
    category: 'personality',
    position: { x: 35, y: 45 },
    content: {
      type: 'interests',
      items: [
        'Experimenting with open-source LLMs at 2am',
        'Hyderabad food explorations (biryani critic)',
        'Building random automation for personal life',
        'Learning about system design & distributed systems',
      ],
    },
  },
  {
    id: 'sticky-notes',
    label: 'Sticky Notes',
    icon: '📝',
    description: 'Contact Me',
    category: 'contact',
    position: { x: 48, y: 22 },
    content: {
      type: 'contact',
      links: [
        { label: 'Email', url: 'mailto:abhinaypadidam97@gmail.com', icon: 'mail' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/abhinaypadidam', icon: 'linkedin' },
        { label: 'GitHub', url: 'https://github.com/abhinaypadidam', icon: 'github' },
      ],
    },
  },
  {
    id: 'rug',
    label: 'Floor Mat',
    icon: '🧶',
    description: 'Site Credits & Tech Stack',
    category: 'meta',
    position: { x: 50, y: 75 },
    content: {
      type: 'meta',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Claude API'],
    },
  },
]
