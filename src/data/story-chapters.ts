export interface StoryPanel {
  type: 'narration' | 'dialogue' | 'wide'
  text: string
  speaker?: string
  visual?: string
}

export interface StoryChapter {
  id: string
  number: number
  title: string
  year: string
  colorAccent: string
  panels: StoryPanel[]
}

export const storyChapters: StoryChapter[] = [
  {
    id: 'dashboard-kid',
    number: 1,
    title: 'The Dashboard Kid',
    year: '2022',
    colorAccent: '#64748B',
    panels: [
      {
        type: 'wide',
        text: '',
        visual: 'A young developer staring at a glowing Power BI dashboard late at night. Blue light on his face.',
      },
      {
        type: 'narration',
        text: 'It started with dashboards. Lots of dashboards.',
      },
      {
        type: 'dialogue',
        text: 'Wait... I can make the computer understand what people FEEL?',
        speaker: 'Abhinay',
      },
      {
        type: 'narration',
        text: 'First time I felt the code doing something HUMAN. I was hooked.',
      },
    ],
  },
  {
    id: 'travel-maze',
    number: 2,
    title: 'The Travel Data Maze',
    year: '2023–2024',
    colorAccent: '#38BDF8',
    panels: [
      {
        type: 'wide',
        text: '',
        visual: 'Abhinay surrounded by floating data points — flights, hotels, routes, revenue numbers everywhere.',
      },
      {
        type: 'narration',
        text: 'Noida. My first real job. Data everywhere.',
      },
      {
        type: 'dialogue',
        text: "I could build these dashboards in my sleep. But I wanted to build something that THINKS.",
        speaker: 'Abhinay',
      },
      {
        type: 'narration',
        text: 'Then I discovered that AI models could actually... understand.',
      },
    ],
  },
  {
    id: 'llm-awakening',
    number: 3,
    title: 'The LLM Awakening',
    year: '2024',
    colorAccent: '#FF6B35',
    panels: [
      {
        type: 'wide',
        text: '',
        visual: 'A dark room. Multiple terminal screens glowing. Llama, Qwen, DeepSeek logos floating in the air.',
      },
      {
        type: 'narration',
        text: 'Founding member of an analytics startup. I had freedom to experiment.',
      },
      {
        type: 'dialogue',
        text: "60% less manual work. Not by working harder. By building smarter.",
        speaker: 'Abhinay',
      },
      {
        type: 'narration',
        text: "I don't want to analyze data. I want to build systems that analyze data FOR me.",
      },
    ],
  },
  {
    id: 'the-lab',
    number: 4,
    title: 'The Lab',
    year: '2025–Present',
    colorAccent: '#FF6B35',
    panels: [
      {
        type: 'wide',
        text: '',
        visual: 'ASBL office. Multiple projects on screen — voicemails, documents, financing models. Everything connected.',
      },
      {
        type: 'narration',
        text: 'Now I build things that listen, read, and decide.',
      },
      {
        type: 'dialogue',
        text: "Australian accents nearly broke everything. Still tuning.",
        speaker: 'Abhinay',
      },
      {
        type: 'narration',
        text: 'I used to work incredibly hard but aimlessly. Now I\'m learning to aim.',
      },
      {
        type: 'dialogue',
        text: "This is my lab. Everything I build lives here. Come explore.",
        speaker: 'Abhinay',
      },
    ],
  },
]
