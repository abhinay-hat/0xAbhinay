import { motion } from 'framer-motion'
import { FlaskConical, MessageCircle, BookOpen, Terminal } from 'lucide-react'
import type { AppMode } from './FloatingNav'
import { Byte } from '../mascot/Byte'

interface ModeSelectorProps {
  onSelect: (mode: AppMode) => void
}

const modeOptions: { id: AppMode; icon: React.ReactNode; label: string; desc: string; accent: string }[] = [
  {
    id: 'lab',
    icon: <FlaskConical size={28} />,
    label: 'Explore the Lab',
    desc: 'Click objects to discover my work',
    accent: '#FF6B35',
  },
  {
    id: 'chat',
    icon: <MessageCircle size={28} />,
    label: 'Chat with Abhinay',
    desc: 'Ask me anything — powered by AI',
    accent: '#00D4FF',
  },
  {
    id: 'story',
    icon: <BookOpen size={28} />,
    label: 'Read My Story',
    desc: 'A graphic novel journey',
    accent: '#FFB347',
  },
  {
    id: 'terminal',
    icon: <Terminal size={28} />,
    label: 'Terminal',
    desc: 'For the nerds and the curious',
    accent: '#4ADE80',
  },
]

export function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1A1A2E 0%, #0F0F1A 70%)',
        padding: '24px',
      }}
    >
      {/* Animated orbiting particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              width: 3 + i,
              height: 3 + i,
              backgroundColor: i % 2 === 0 ? '#FF6B35' : '#00D4FF',
              left: '50%',
              top: '50%',
              opacity: 0.15 + i * 0.05,
              transformOrigin: `0 ${80 + i * 60}px`,
            }}
          />
        ))}
      </div>

      {/* Subtle gradient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, rgba(0,212,255,0.02) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Byte mascot */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <Byte emotion="happy" size={120} />
      </motion.div>

      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: '32px', marginBottom: '48px', position: 'relative', zIndex: 1 }}
      >
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#F1F5F9',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome to{' '}
          <span className="text-gradient-orange glow-text-orange">Abhinay's Lab</span>
        </h1>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            color: '#94A3B8',
            marginTop: '12px',
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
          }}
        >
          How do you want to explore?
        </p>
      </motion.div>

      {/* Mode buttons — 2x2 grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '640px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {modeOptions.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mode.id)}
            className="glass-card cursor-pointer"
            style={{
              borderRadius: '20px',
              padding: '28px 24px',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Hover glow orb */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${mode.accent}15, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `${mode.accent}15`,
                border: `1px solid ${mode.accent}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: mode.accent,
                marginBottom: '16px',
              }}
            >
              {mode.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                color: '#F1F5F9',
                fontSize: '1.05rem',
              }}
            >
              {mode.label}
            </h3>
            <p
              style={{
                color: '#64748B',
                fontSize: '0.85rem',
                marginTop: '6px',
                lineHeight: 1.5,
              }}
            >
              {mode.desc}
            </p>
          </motion.button>
        ))}
      </motion.div>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          color: 'rgba(100, 116, 139, 0.4)',
          fontSize: '0.7rem',
          marginTop: '40px',
          fontFamily: "'JetBrains Mono', monospace",
          position: 'relative',
          zIndex: 1,
        }}
      >
        press any key or click to begin · switch modes anytime
      </motion.p>
    </motion.div>
  )
}
