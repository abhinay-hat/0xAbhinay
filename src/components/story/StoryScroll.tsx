import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { storyChapters, type StoryPanel } from '../../data/story-chapters'

interface StoryScrollProps {
  onBackToLab: () => void
}

export function StoryScroll({ onBackToLab }: StoryScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', backgroundColor: '#0F0F1A' }}
    >
      {/* Story header */}
      <div
        className="glass-dark"
        style={{ position: 'sticky', top: 0, zIndex: 30 }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', color: '#FF6B35', letterSpacing: '0.1em' }}>
            ABHINAY'S STORY
          </span>
          <button
            onClick={onBackToLab}
            style={{
              color: '#94A3B8',
              fontSize: '0.8rem',
              fontFamily: "'JetBrains Mono', monospace",
              background: 'rgba(42, 63, 95, 0.2)',
              border: '1px solid rgba(42, 63, 95, 0.3)',
              borderRadius: '10px',
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B35'
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8'
              e.currentTarget.style.borderColor = 'rgba(42, 63, 95, 0.3)'
              e.currentTarget.style.background = 'rgba(42, 63, 95, 0.2)'
            }}
          >
            Back to Lab
          </button>
        </div>
      </div>

      {/* Title splash */}
      <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, rgba(255,179,71,0.02) 40%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

        {/* Large watermark behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -55%)',
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(7rem, 18vw, 13rem)',
            color: 'transparent',
            letterSpacing: '0.08em',
            WebkitTextStroke: '1px rgba(255, 107, 53, 0.08)',
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          STORY
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.8rem, 8vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: 1,
            color: '#F1F5F9',
            lineHeight: 1.1,
          }}
        >
          THE{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            JOURNEY
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            color: '#94A3B8',
            marginTop: '20px',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            maxWidth: '440px',
            lineHeight: 1.7,
            position: 'relative',
            zIndex: 1,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          From dashboards to AI systems — told as a story, not a resume.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: '48px', position: 'relative', zIndex: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF6B35',
              fontSize: '1rem',
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Chapters */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
        {storyChapters.map((chapter, idx) => (
          <ChapterSection key={chapter.id} chapter={chapter} chapterIndex={idx} />
        ))}
      </div>

      {/* Final CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 120px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F1F5F9', marginBottom: '28px', letterSpacing: '0.03em' }}>
            This is my lab. Everything I build lives here.
          </p>
          <button
            onClick={onBackToLab}
            style={{ padding: '16px 40px', borderRadius: '14px', color: '#0F0F1A', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #FF6B35, #FFB347)', boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,53,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,53,0.3)' }}
          >
            → Enter the Lab
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ========== Chapter illustrations ========== */

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 600 220" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Monitor glow */}
      <ellipse cx="300" cy="180" rx="200" ry="40" fill="#3B82F6" opacity="0.06" />
      {/* Desk */}
      <rect x="100" y="170" width="400" height="8" rx="4" fill="#1E2D4A" />
      {/* Monitor */}
      <rect x="180" y="40" width="240" height="140" rx="8" fill="#0A0F1C" stroke="#2A3F5F" strokeWidth="2" />
      <rect x="190" y="50" width="220" height="110" rx="4" fill="#111827" />
      {/* Monitor stand */}
      <rect x="280" y="170" width="40" height="12" fill="#1E2D4A" />
      {/* Dashboard content */}
      {/* Bar chart */}
      <rect x="205" y="115" width="14" height="35" rx="2" fill="#3B82F6" opacity="0.7" />
      <rect x="225" y="100" width="14" height="50" rx="2" fill="#3B82F6" opacity="0.8" />
      <rect x="245" y="110" width="14" height="40" rx="2" fill="#3B82F6" opacity="0.6" />
      <rect x="265" y="90" width="14" height="60" rx="2" fill="#60A5FA" opacity="0.9" />
      <rect x="285" y="105" width="14" height="45" rx="2" fill="#3B82F6" opacity="0.7" />
      {/* Line chart */}
      <polyline points="205,75 230,65 260,70 290,55 320,60 350,50 390,45" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.6" />
      {/* Pie chart */}
      <circle cx="365" cy="105" r="25" fill="none" stroke="#2A3F5F" strokeWidth="6" />
      <circle cx="365" cy="105" r="25" fill="none" stroke="#3B82F6" strokeWidth="6" strokeDasharray="50 110" strokeDashoffset="0" />
      <circle cx="365" cy="105" r="25" fill="none" stroke="#60A5FA" strokeWidth="6" strokeDasharray="30 130" strokeDashoffset="-50" />
      {/* Person silhouette */}
      <circle cx="130" cy="110" r="15" fill="#1E2D4A" />
      <rect x="115" y="128" width="30" height="40" rx="8" fill="#1E2D4A" />
      {/* Blue glow on face */}
      <ellipse cx="145" cy="115" rx="15" ry="20" fill="#3B82F6" opacity="0.08" />
      {/* Late night indicators */}
      <circle cx="480" cy="60" r="2" fill="#FFB347" opacity="0.5" />
      <circle cx="500" cy="80" r="1.5" fill="#FFB347" opacity="0.3" />
      <text x="460" y="180" fill="#64748B" fontSize="8" fontFamily="'JetBrains Mono', monospace" opacity="0.4">02:47 AM</text>
    </svg>
  )
}

function TravelDataIllustration() {
  return (
    <svg viewBox="0 0 600 220" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Data points floating */}
      {[
        { x: 80, y: 60, label: '✈', size: 20 },
        { x: 200, y: 40, label: '🏨', size: 16 },
        { x: 350, y: 55, label: '₹', size: 14 },
        { x: 480, y: 45, label: '📊', size: 18 },
        { x: 130, y: 150, label: '🗺', size: 16 },
        { x: 420, y: 160, label: '📈', size: 14 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.size + 10} fill="#38BDF8" opacity="0.04" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={p.size} opacity="0.6">{p.label}</text>
        </g>
      ))}
      {/* Connection lines */}
      <line x1="100" y1="70" x2="200" y2="50" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
      <line x1="200" y1="50" x2="350" y2="65" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
      <line x1="350" y1="65" x2="480" y2="55" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
      <line x1="130" y1="155" x2="350" y2="65" stroke="#38BDF8" strokeWidth="0.5" opacity="0.15" />
      <line x1="420" y1="165" x2="480" y2="55" stroke="#38BDF8" strokeWidth="0.5" opacity="0.15" />
      {/* Person in center */}
      <circle cx="300" cy="120" r="18" fill="#16213E" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
      <circle cx="300" cy="112" r="6" fill="#38BDF8" opacity="0.3" />
      <rect x="290" y="122" width="20" height="12" rx="4" fill="#38BDF8" opacity="0.2" />
      {/* Floating numbers */}
      <text x="150" y="105" fill="#38BDF8" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.35">2.4M rows</text>
      <text x="380" y="120" fill="#38BDF8" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.35">revenue +12%</text>
      <text x="250" y="185" fill="#38BDF8" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.3">45 dashboards</text>
    </svg>
  )
}

function LLMIllustration() {
  return (
    <svg viewBox="0 0 600 220" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Multiple terminal screens */}
      {/* Screen 1 */}
      <rect x="30" y="30" width="160" height="100" rx="6" fill="#0A0F1C" stroke="#2A3F5F" strokeWidth="1.5" />
      <rect x="38" y="38" width="144" height="80" rx="3" fill="#111827" />
      <text x="45" y="55" fill="#4ADE80" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.8">$ llama run</text>
      <text x="45" y="68" fill="#4ADE80" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.5">Loading model...</text>
      <text x="45" y="81" fill="#4ADE80" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.4">█████████░ 89%</text>
      <rect x="45" y="90" width="6" height="10" fill="#4ADE80" opacity="0.7">
        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
      </rect>

      {/* Screen 2 */}
      <rect x="220" y="20" width="160" height="100" rx="6" fill="#0A0F1C" stroke="#FF6B35" strokeWidth="1.5" opacity="0.8" />
      <rect x="228" y="28" width="144" height="80" rx="3" fill="#111827" />
      <text x="235" y="48" fill="#FF6B35" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.8">qwen-72b</text>
      <text x="235" y="61" fill="#CBD5E1" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.4">inference: 42 tok/s</text>
      <text x="235" y="74" fill="#CBD5E1" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.4">accuracy: 94.2%</text>
      <text x="235" y="90" fill="#FF6B35" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.5">▸ processing batch 47</text>

      {/* Screen 3 */}
      <rect x="410" y="40" width="160" height="100" rx="6" fill="#0A0F1C" stroke="#2A3F5F" strokeWidth="1.5" />
      <rect x="418" y="48" width="144" height="80" rx="3" fill="#111827" />
      <text x="425" y="65" fill="#00D4FF" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.8">deepseek-v2</text>
      <text x="425" y="78" fill="#CBD5E1" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.4">context: 128k</text>
      <text x="425" y="91" fill="#4ADE80" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.5">✓ deployed</text>

      {/* N8n workflow nodes */}
      <circle cx="100" cy="170" r="12" fill="#1E2D4A" stroke="#FF6B35" strokeWidth="1.5" />
      <circle cx="200" cy="180" r="12" fill="#1E2D4A" stroke="#FFB347" strokeWidth="1.5" />
      <circle cx="300" cy="170" r="12" fill="#1E2D4A" stroke="#00D4FF" strokeWidth="1.5" />
      <circle cx="400" cy="180" r="12" fill="#1E2D4A" stroke="#4ADE80" strokeWidth="1.5" />
      <circle cx="500" cy="170" r="12" fill="#1E2D4A" stroke="#FF6B35" strokeWidth="1.5" />
      {/* Connections */}
      <line x1="112" y1="170" x2="188" y2="180" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="212" y1="180" x2="288" y2="170" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="312" y1="170" x2="388" y2="180" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="412" y1="180" x2="488" y2="170" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 3" />
      {/* Node labels */}
      <text x="100" y="200" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">input</text>
      <text x="200" y="207" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">process</text>
      <text x="300" y="200" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">LLM</text>
      <text x="400" y="207" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">validate</text>
      <text x="500" y="200" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">output</text>
      {/* -60% label */}
      <text x="300" y="155" textAnchor="middle" fill="#FF6B35" fontSize="11" fontFamily="'Syne', sans-serif" letterSpacing="0.05em" opacity="0.5">-60% MANUAL WORK</text>
    </svg>
  )
}

function TheLabIllustration() {
  return (
    <svg viewBox="0 0 600 220" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Multiple project windows */}
      {/* Voicemail */}
      <rect x="30" y="30" width="150" height="85" rx="6" fill="#0A0F1C" stroke="#FF6B35" strokeWidth="1.5" />
      <rect x="30" y="30" width="150" height="18" rx="6" fill="#1E2D4A" />
      <circle cx="42" cy="39" r="3" fill="#EF4444" opacity="0.6" />
      <circle cx="52" cy="39" r="3" fill="#F59E0B" opacity="0.6" />
      <circle cx="62" cy="39" r="3" fill="#4ADE80" opacity="0.6" />
      <text x="80" y="42" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">voicemail.py</text>
      {/* Audio waveform */}
      {[38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158].map((x, i) => (
        <rect key={i} x={x} y={75 - Math.sin(i * 0.8) * 12 - Math.random() * 5} width="3" height={Math.abs(Math.sin(i * 0.8) * 24) + 4} rx="1.5" fill="#FF6B35" opacity={0.4 + Math.sin(i * 0.5) * 0.3} />
      ))}
      <text x="40" y="105" fill="#4ADE80" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.5">▸ transcribing...</text>

      {/* Document AI */}
      <rect x="220" y="20" width="150" height="85" rx="6" fill="#0A0F1C" stroke="#00D4FF" strokeWidth="1.5" />
      <rect x="220" y="20" width="150" height="18" rx="6" fill="#1E2D4A" />
      <circle cx="232" cy="29" r="3" fill="#EF4444" opacity="0.6" />
      <circle cx="242" cy="29" r="3" fill="#F59E0B" opacity="0.6" />
      <circle cx="252" cy="29" r="3" fill="#4ADE80" opacity="0.6" />
      <text x="265" y="32" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">extract.ts</text>
      {/* Document icon */}
      <rect x="240" y="48" width="30" height="38" rx="3" fill="#16213E" stroke="#2A3F5F" strokeWidth="1" />
      <line x1="248" y1="58" x2="262" y2="58" stroke="#2A3F5F" strokeWidth="1" />
      <line x1="248" y1="64" x2="258" y2="64" stroke="#2A3F5F" strokeWidth="1" />
      <line x1="248" y1="70" x2="262" y2="70" stroke="#2A3F5F" strokeWidth="1" />
      {/* Arrow */}
      <text x="280" y="70" fill="#00D4FF" fontSize="14" opacity="0.5">→</text>
      {/* JSON output */}
      <text x="300" y="58" fill="#00D4FF" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.6">{'{'}</text>
      <text x="306" y="68" fill="#4ADE80" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.5">"name": ...</text>
      <text x="306" y="78" fill="#4ADE80" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.5">"total": ...</text>
      <text x="300" y="88" fill="#00D4FF" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.6">{'}'}</text>

      {/* Financing Engine */}
      <rect x="410" y="35" width="160" height="85" rx="6" fill="#0A0F1C" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="410" y="35" width="160" height="18" rx="6" fill="#1E2D4A" />
      <circle cx="422" cy="44" r="3" fill="#EF4444" opacity="0.6" />
      <circle cx="432" cy="44" r="3" fill="#F59E0B" opacity="0.6" />
      <circle cx="442" cy="44" r="3" fill="#4ADE80" opacity="0.6" />
      <text x="455" y="47" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">financing.py</text>
      {/* Gauge */}
      <circle cx="490" cy="85" r="22" fill="none" stroke="#2A3F5F" strokeWidth="4" />
      <circle cx="490" cy="85" r="22" fill="none" stroke="#4ADE80" strokeWidth="4" strokeDasharray="100 40" strokeLinecap="round" />
      <text x="490" y="89" textAnchor="middle" fill="#4ADE80" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">94%</text>
      <text x="490" y="115" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="'JetBrains Mono', monospace">eligible</text>

      {/* Connected lines at bottom */}
      <line x1="105" y1="125" x2="295" y2="145" stroke="#2A3F5F" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="295" y1="115" x2="490" y2="130" stroke="#2A3F5F" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

      {/* Bottom status */}
      <rect x="150" y="155" width="300" height="40" rx="8" fill="#16213E" opacity="0.5" />
      <text x="300" y="175" textAnchor="middle" fill="#F1F5F9" fontSize="9" fontFamily="'Syne', sans-serif" fontWeight="600">Now I build things that listen, read, and decide.</text>
      <text x="300" y="188" textAnchor="middle" fill="#FF6B35" fontSize="7" fontFamily="'JetBrains Mono', monospace" opacity="0.5">3 production systems · ASBL · 2025</text>
    </svg>
  )
}

const ILLUSTRATIONS = [DashboardIllustration, TravelDataIllustration, LLMIllustration, TheLabIllustration]

/* ========== Chapter Section ========== */

function ChapterSection({ chapter, chapterIndex }: { chapter: typeof storyChapters[0]; chapterIndex: number }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <div ref={ref} style={{ marginBottom: '120px' }}>
      {/* Chapter divider line */}
      {chapterIndex > 0 && (
        <div style={{ width: '60px', height: '2px', background: `linear-gradient(90deg, ${chapter.colorAccent}, transparent)`, marginBottom: '48px', opacity: 0.4 }} />
      )}

      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '40px', paddingLeft: '24px', borderLeft: `4px solid ${chapter.colorAccent}` }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: chapter.colorAccent, display: 'block' }}>
          Chapter {chapter.number} · {chapter.year}
        </span>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F1F5F9', marginTop: '10px', fontWeight: 800, letterSpacing: '-0.01em' }}>
          {chapter.title}
        </h2>
      </motion.div>

      {/* Panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {chapter.panels.map((panel, i) => (
          <PanelComponent key={i} panel={panel} index={i} accentColor={chapter.colorAccent} chapterIndex={chapterIndex} />
        ))}
      </div>
    </div>
  )
}

/* ========== Panel Component ========== */

function PanelComponent({ panel, index, accentColor, chapterIndex }: { panel: StoryPanel; index: number; accentColor: string; chapterIndex: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  if (panel.type === 'wide') {
    const Illustration = ILLUSTRATIONS[chapterIndex] || ILLUSTRATIONS[0]
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08 }}
        style={{
          width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          background: `linear-gradient(160deg, ${accentColor}12, #0F0F1A 60%, ${accentColor}08)`,
          border: `1px solid ${accentColor}25`,
          padding: '32px 24px 24px',
          position: 'relative',
        }}
      >
        {/* Glow effect */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '60%', height: '2px', background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />
        <Illustration />
      </motion.div>
    )
  }

  if (panel.type === 'dialogue') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        style={{ position: 'relative', marginLeft: '32px' }}
      >
        <div
          style={{
            borderRadius: '20px',
            borderBottomLeftRadius: '6px',
            padding: '24px 28px',
            maxWidth: '600px',
            backgroundColor: `${accentColor}12`,
            border: `1px solid ${accentColor}30`,
            position: 'relative',
          }}
        >
          {/* Quote mark */}
          <span style={{ position: 'absolute', top: '8px', left: '16px', fontSize: '2.5rem', color: accentColor, opacity: 0.15, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>"</span>
          <p style={{ color: '#F1F5F9', fontSize: '1.1rem', fontFamily: "'Syne', sans-serif", lineHeight: 1.7, paddingLeft: '8px' }}>
            {panel.text}
          </p>
          <span style={{ fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '14px', display: 'block', color: accentColor, paddingLeft: '8px' }}>
            — {panel.speaker}
          </span>
        </div>
        {/* Pointer */}
        <div style={{ position: 'absolute', left: '-7px', bottom: '24px', width: '14px', height: '14px', transform: 'rotate(45deg)', backgroundColor: `${accentColor}12`, borderLeft: `1px solid ${accentColor}30`, borderBottom: `1px solid ${accentColor}30` }} />
      </motion.div>
    )
  }

  // Narration
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ padding: '16px 24px', marginLeft: '8px', borderLeft: `2px solid ${accentColor}35` }}
    >
      <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic' }}>
        {panel.text}
      </p>
    </motion.div>
  )
}
