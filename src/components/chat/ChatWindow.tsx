import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { Byte } from '../mascot/Byte'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWindowProps {
  onClose: () => void
}

const SUGGESTIONS = [
  "What are you building right now?",
  "Tell me about your wildest experiment",
  "What's your tech stack?",
  "Are you open to opportunities?",
]

const FALLBACK_RESPONSES: Record<string, string> = {
  "What are you building right now?":
    "Right now at ASBL I'm building a voicemail transcription pipeline with Faster Whisper and Qwen — processing multi-language audio in real-time. Also working on an AI financing eligibility engine that evaluates customer profiles. And on the side, I'm always experimenting with open-source LLMs. Llama, DeepSeek... I throw things at the wall to see what sticks.",
  "Tell me about your wildest experiment":
    "Oh man, probably the voicemail transcription system. Not because of the tech — Faster Whisper handles the transcription well. The hard part was making it work across 6+ country formats with wildly different accents. Australian English nearly broke EVERYTHING. The demo worked in 2 days. The last 10% has taken months. That's the thing about production AI — it's a completely different game from research.",
  "What's your tech stack?":
    "Core: Python for AI/ML stuff (LLMs, speech processing, data pipelines). TypeScript/React for web. My AI toolbox includes Llama, Qwen, DeepSeek, Faster Whisper, Moondream, Docling, and Claude API. For automation, N8n is my go-to — it's incredibly powerful for connecting systems. PostgreSQL for data, Docker for deployment, and Vercel for web hosting. I don't stick to one stack though — I try everything and pick what's best for the problem.",
  "Are you open to opportunities?":
    "Always open to interesting conversations! I'm currently at ASBL building some really cool AI products, but if you're working on something exciting — especially in LLM engineering, AI automation, or building AI products — I'd love to chat. Drop me a message at abhinaypadidam97@gmail.com. I respond to everything. Seriously.",
}

function getDefaultResponse(input: string): string {
  const lower = input.toLowerCase()

  if (lower.includes('different') || lower.includes('unique') || lower.includes('stand out'))
    return "Honestly? I don't just use AI tools — I experiment obsessively with them. Llama, Qwen, DeepSeek, Faster Whisper, Moondream, Docling... I throw things at the wall to see what sticks. Most engineers pick one stack. I try everything, break things, then build something better. Also, I'm probably the only AI engineer whose portfolio has a robot pet you can talk to. So there's that. 😄"

  if (lower.includes('hardest') || lower.includes('challenging') || lower.includes('difficult'))
    return "The voicemail transcription system at ASBL. Not because of the tech — Faster Whisper handles the transcription well. The hard part was making it work across 6 different country formats with wildly different accents and audio qualities. Australian English nearly broke everything. We're still tuning it, honestly. That's the thing about production AI — the demo works in 2 days, the last 10% takes 2 months."

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return "Hey! 👋 Welcome to my lab. I'm Abhinay — a Product AI Engineer who builds intelligent systems that actually ship. Ask me about my projects, my tech stack, or just anything really. I'm pretty open."

  if (lower.includes('resume') || lower.includes('cv'))
    return "You can download my resume by going to the Terminal (press the backtick key `) and typing 'sudo hire abhinay'. Yeah, I made it fun. You can also find it through the contact section. Or just email me at abhinaypadidam97@gmail.com and I'll send it over!"

  if (lower.includes('hobby') || lower.includes('fun') || lower.includes('outside work'))
    return "When I'm not building AI systems? I'm usually experimenting with open-source LLMs at 2am (does that count as a hobby?). I'm a serious Hyderabad biryani critic. I automate random things in my personal life because... why not? And I'm currently deep into learning system design and distributed systems. Building things IS my hobby, honestly."

  return "That's a great question! I'm an AI version of Abhinay, so I might not have the perfect answer for that specific question. But I can tell you about his projects, tech stack, career journey, or what he's currently building. Or you could try the Terminal (press `) — there's some fun stuff in there. 😄"
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [closeHover, setCloseHover] = useState(false)
  const [sendHover, setSendHover] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim() || messageCount >= 20) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setMessageCount(prev => prev + 1)
    setIsTyping(true)

    // Simulate response (using fallback FAQ in v1)
    setTimeout(() => {
      const response = FALLBACK_RESPONSES[text] || getDefaultResponse(text)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
  }

  const isSendDisabled = !input.trim() || messageCount >= 20

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="glass-dark chat-window-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Responsive: full screen on mobile, fixed card on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .chat-window-root {
            inset: auto !important;
            bottom: 0 !important;
            right: 0 !important;
            width: 420px !important;
            height: 600px !important;
            margin: 24px !important;
            border-radius: 16px !important;
          }
        }
        .chat-window-root input::placeholder {
          color: rgba(100, 116, 139, 0.5);
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          borderBottom: '1px solid rgba(42, 63, 95, 0.3)',
          background: 'rgba(15, 15, 26, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Byte emotion={isTyping ? 'thinking' : 'happy'} size={40} />
          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                color: '#F1F5F9',
                fontSize: 14,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Ask Abhinay
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4ADE80',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.4)',
              }} />
            </h3>
            <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>
              AI-powered · {20 - messageCount} messages left
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: closeHover ? 'rgba(255, 107, 53, 0.15)' : 'rgba(42, 63, 95, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: closeHover ? '#FF6B35' : '#64748B',
            transition: 'all 0.2s ease',
            border: `1px solid ${closeHover ? 'rgba(255, 107, 53, 0.3)' : 'rgba(42, 63, 95, 0.3)'}`,
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: 32,
            }}
          >
            <Byte emotion="idle" size={64} />
            <p
              style={{
                color: '#64748B',
                fontSize: 14,
                marginTop: 16,
                maxWidth: 280,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Hey! I'm Byte, Abhinay's AI companion. Ask me anything about his work, skills, or journey.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 24,
                justifyContent: 'center',
              }}
            >
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  onMouseEnter={() => setHoveredSuggestion(s)}
                  onMouseLeave={() => setHoveredSuggestion(null)}
                  style={{
                    fontSize: 12,
                    padding: '8px 12px',
                    borderRadius: 12,
                    backgroundColor: '#1E2D4A',
                    border: `1px solid ${hoveredSuggestion === s ? 'rgba(255, 107, 53, 0.4)' : 'rgba(42, 63, 95, 0.5)'}`,
                    color: hoveredSuggestion === s ? '#FF6B35' : '#CBD5E1',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                borderRadius: 16,
                padding: '12px 16px',
                fontSize: 14,
                lineHeight: 1.625,
                fontFamily: "'Syne', sans-serif",
                ...(msg.role === 'user'
                  ? {
                      backgroundColor: 'rgba(255, 107, 53, 0.15)',
                      color: '#F1F5F9',
                      borderBottomRightRadius: 6,
                    }
                  : {
                      backgroundColor: '#1E2D4A',
                      border: '1px solid rgba(42, 63, 95, 0.3)',
                      color: '#CBD5E1',
                      borderBottomLeftRadius: 6,
                    }),
              }}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Byte emotion="thinking" size={28} />
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  padding: '12px 16px',
                  borderRadius: 16,
                  backgroundColor: '#1E2D4A',
                  border: '1px solid rgba(42, 63, 95, 0.3)',
                  borderBottomLeftRadius: 6,
                }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#64748B',
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Privacy notice */}
      <p
        style={{
          textAlign: 'center',
          color: 'rgba(100, 116, 139, 0.4)',
          fontSize: 10,
          padding: '0 16px',
          margin: 0,
        }}
      >
        Your chat isn't saved
      </p>

      {/* Input */}
      <div style={{ padding: 12, borderTop: '1px solid rgba(42, 63, 95, 0.3)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#1E2D4A',
            borderRadius: 12,
            padding: '8px 16px',
            border: `1px solid ${inputFocused ? 'rgba(255, 107, 53, 0.4)' : 'rgba(42, 63, 95, 0.3)'}`,
            transition: 'border-color 0.15s ease',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder={messageCount >= 20 ? "Message limit reached" : "Ask me anything..."}
            disabled={messageCount >= 20}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: '#F1F5F9',
              fontSize: 14,
              outline: 'none',
              border: 'none',
              fontFamily: "'Syne', sans-serif",
              opacity: messageCount >= 20 ? 0.5 : 1,
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isSendDisabled}
            onMouseEnter={() => setSendHover(true)}
            onMouseLeave={() => setSendHover(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: isSendDisabled
                ? 'rgba(42, 63, 95, 0.3)'
                : sendHover
                  ? 'linear-gradient(135deg, #FF6B35, #FFB347)'
                  : 'rgba(255, 107, 53, 0.2)',
              color: isSendDisabled ? '#64748B' : sendHover ? '#0F0F1A' : '#FF6B35',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isSendDisabled ? '1px solid rgba(42, 63, 95, 0.3)' : `1px solid ${sendHover ? 'transparent' : 'rgba(255, 107, 53, 0.3)'}`,
              cursor: isSendDisabled ? 'default' : 'pointer',
              opacity: isSendDisabled ? 0.4 : 1,
              transition: 'all 0.2s ease',
              flexShrink: 0,
              boxShadow: !isSendDisabled && sendHover ? '0 4px 16px rgba(255, 107, 53, 0.3)' : 'none',
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
