export interface TerminalCommand {
  name: string
  description: string
  handler: (args: string[]) => string | { type: 'special'; action: string }
}

const NEOFETCH = `
  ┌──────────────────────────────────┐
  │  abhinay@lab                     │
  │  ─────────────────               │
  │  OS: Builder v24.0               │
  │  Uptime: 24 years                │
  │  Shell: Python / JS / SQL        │
  │  IDE: VS Code (dark mode only)   │
  │  AI: Llama, Qwen, DeepSeek       │
  │  Location: Hyderabad, IN         │
  │  Status: Building...             │
  │  Coffee: ████████████ 100%       │
  └──────────────────────────────────┘`

const SKILLS_TREE = `
  abhinay/skills/
  ├── ai-ml/
  │   ├── llama ████████░░ core
  │   ├── qwen ████████░░ core
  │   ├── deepseek ██████░░░░ strong
  │   ├── claude-api ████████░░ core
  │   ├── faster-whisper ████████░░ core
  │   └── moondream ██████░░░░ strong
  ├── data/
  │   ├── python ██████████ core
  │   ├── pandas ████████░░ core
  │   ├── sql ████████░░ core
  │   └── docling ██████░░░░ strong
  ├── web/
  │   ├── typescript ██████░░░░ strong
  │   ├── react ██████░░░░ strong
  │   └── node.js ██████░░░░ strong
  ├── automation/
  │   ├── n8n ████████░░ core
  │   └── rest-apis ████████░░ core
  └── cloud/
      ├── docker ██████░░░░ strong
      └── vercel ████░░░░░░ familiar`

const FORTUNE_QUOTES = [
  '"Ship it, then fix it." — Abhinay',
  '"The demo works in 2 days. The last 10% takes 2 months." — Abhinay',
  '"If it\'s not automated, it\'s not done." — Abhinay',
  '"I used to work incredibly hard but aimlessly. Now I aim." — Abhinay',
  '"Most engineers pick one stack. I try everything and break things." — Abhinay',
  '"Sometimes things break. That\'s the point." — Abhinay',
  '"Building things is the best way to learn." — Abhinay',
  '"Don\'t just visit a portfolio. Explore a mind." — Abhinay\'s Lab',
]

const PROJECT_LIST = `
  voicemail    Voicemail Transcription Pipeline — Faster Whisper + Qwen
  financing    AI Financing Eligibility Engine — LLM-powered decisions
  docextract   Document Extraction Engine — Docling + Moondream + Claude
  automation   N8n Automation Workflows — 60% less manual work`

const PROJECT_DETAILS: Record<string, string> = {
  voicemail: `
  ╔═══════════════════════════════════════════╗
  ║  VOICEMAIL TRANSCRIPTION PIPELINE         ║
  ╚═══════════════════════════════════════════╝

  Problem:  Multi-language voicemails across 6+ countries
            with wildly different accents and audio quality.

  Stack:    Faster Whisper · Qwen · Python · Docker

  Result:   Real-time production transcription system.
            Australian accents nearly broke everything.
            Still tuning — because production AI never stops.

  Status:   🟢 Live at ASBL`,
  financing: `
  ╔═══════════════════════════════════════════╗
  ║  AI FINANCING ELIGIBILITY ENGINE          ║
  ╚═══════════════════════════════════════════╝

  Problem:  Manual financing review was slow, inconsistent,
            and bottlenecking the entire business pipeline.

  Stack:    LLMs · Python · PostgreSQL · REST API

  Result:   40% reduction in manual review time.
            Handles edge cases that rule-based systems miss.

  Status:   🟢 Live at ASBL`,
  docextract: `
  ╔═══════════════════════════════════════════╗
  ║  DOCUMENT EXTRACTION ENGINE               ║
  ╚═══════════════════════════════════════════╝

  Problem:  Messy PDFs, invoices, contracts → need
            structured data at scale with high accuracy.

  Stack:    Docling · Moondream · Claude API · OCR

  Result:   Varied formats → clean structured JSON.
            Visual understanding + LLM intelligence.

  Status:   🟢 Live at ASBL`,
  automation: `
  ╔═══════════════════════════════════════════╗
  ║  N8N AUTOMATION WORKFLOWS                 ║
  ╚═══════════════════════════════════════════╝

  Problem:  60% of workflows were manual — copying data
            between systems, manual entry, repetitive tasks.

  Stack:    N8n · REST APIs · Webhooks · Node.js

  Result:   60% reduction in manual processing.
            Systems that run themselves. More building time.

  Status:   🟢 Live at ASBL`,
}

export const commands: TerminalCommand[] = [
  {
    name: 'help',
    description: 'List all available commands',
    handler: () => `
  Available commands:
  ──────────────────────────────────────────
  about              Who is Abhinay?
  ls projects/       List all projects
  cat projects/NAME  View project details
  skills --tree      ASCII skill tree
  history            Career timeline
  neofetch           System info, Abhinay style
  fortune            Random wisdom
  ping abhinay       Check if he's online
  whoami             Who are you?
  cowsay TEXT        Make a cow say things
  contact            Get in touch
  sudo hire abhinay  Download resume
  theme THEME        Change colors (green|cyan|amber|orange)
  matrix             You know what this does
  rm -rf /           Try it. I dare you.
  clear              Clear screen
  exit               Return to the Lab
  ──────────────────────────────────────────`,
  },
  {
    name: 'about',
    description: 'About Abhinay',
    handler: () => `
  Abhinay Padidam — Product AI Engineer
  Hyderabad, India · Currently building at ASBL

  I build intelligent systems that turn raw data into
  products people actually use. LLMs, speech processing,
  document extraction, automation — I ship AI that works.`,
  },
  {
    name: 'ls',
    description: 'List projects',
    handler: (args) => {
      if (args[0] === 'projects/' || args[0] === 'projects') return PROJECT_LIST
      return `  ls: ${args[0] || '.'}: try 'ls projects/'`
    },
  },
  {
    name: 'cat',
    description: 'View project details',
    handler: (args) => {
      const path = args[0] || ''
      const project = path.replace('projects/', '')
      if (PROJECT_DETAILS[project]) return PROJECT_DETAILS[project]
      if (path === 'interests.txt')
        return '  LLMs, automation, 2am builds, chai, breaking things, Hyderabad biryanis'
      return `  cat: ${path}: No such file. Try 'ls projects/' first.`
    },
  },
  {
    name: 'skills',
    description: 'Skill tree',
    handler: (args) => {
      if (args[0] === '--tree') return SKILLS_TREE
      return '  Usage: skills --tree'
    },
  },
  {
    name: 'history',
    description: 'Career timeline',
    handler: () => `
  ┌─ 2022 ──── Data Analyst
  │            Power BI · Sentiment Analysis · NLP
  │            "First time code did something HUMAN."
  │
  ├─ 2023 ──── Data Engineer
  │            ETL Pipelines · Travel Analytics · Dashboards
  │            "I could build these in my sleep."
  │
  ├─ 2024 ──── AI Engineer (Startup)
  │            N8n · LLMs · Automation · 60% manual reduction
  │            "I don't want to analyze data. I want to build
  │             systems that analyze data FOR me."
  │
  └─ NOW ───── Product AI Engineer @ ASBL
               Voicemail · Document AI · Financing Engines
               "Now I build things that listen, read, and decide."`,
  },
  {
    name: 'neofetch',
    description: 'System info',
    handler: () => NEOFETCH,
  },
  {
    name: 'fortune',
    description: 'Random quote',
    handler: () => `  ${FORTUNE_QUOTES[Math.floor(Math.random() * FORTUNE_QUOTES.length)]}`,
  },
  {
    name: 'ping',
    description: 'Ping Abhinay',
    handler: (args) => {
      if (args[0] === 'abhinay') return '  PONG! 24ms — Online and building something. 🟢'
      return `  ping: unknown host: ${args[0] || '???'}`
    },
  },
  {
    name: 'whoami',
    description: 'Who are you?',
    handler: () => "  A curious visitor exploring Abhinay's mind. Welcome. 👋",
  },
  {
    name: 'cowsay',
    description: 'Make a cow talk',
    handler: (args) => {
      const text = args.join(' ') || 'moo'
      const line = '─'.repeat(text.length + 2)
      return `
   ┌${line}┐
   │ ${text} │
   └${line}┘
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||`
    },
  },
  {
    name: 'contact',
    description: 'Contact info',
    handler: () => `
  ┌─ CONTACT ──────────────────────────────┐
  │                                        │
  │  📧  abhinaypadidam97@gmail.com        │
  │  🔗  linkedin.com/in/abhinaypadidam    │
  │  🐙  github.com/abhinaypadidam         │
  │                                        │
  │  "Ping me. I'm open to anything."      │
  └────────────────────────────────────────┘`,
  },
  {
    name: 'sudo',
    description: 'Sudo commands',
    handler: (args) => {
      if (args.join(' ') === 'hire abhinay') {
        return { type: 'special', action: 'download-resume' } as any
      }
      return '  sudo: nice try. Only "sudo hire abhinay" works here.'
    },
  },
  {
    name: 'theme',
    description: 'Change terminal theme',
    handler: (args) => {
      const valid = ['green', 'cyan', 'amber', 'orange']
      if (valid.includes(args[0])) {
        return { type: 'special', action: `theme-${args[0]}` } as any
      }
      return `  Available themes: ${valid.join(', ')}`
    },
  },
  {
    name: 'matrix',
    description: 'Matrix rain',
    handler: () => ({ type: 'special', action: 'matrix' }) as any,
  },
  {
    name: 'rm',
    description: 'Nice try',
    handler: () => "  Nice try. But you can't delete me that easily. 😏",
  },
  {
    name: 'exit',
    description: 'Exit terminal',
    handler: () => ({ type: 'special', action: 'exit' }) as any,
  },
  {
    name: 'clear',
    description: 'Clear screen',
    handler: () => ({ type: 'special', action: 'clear' }) as any,
  },
]
