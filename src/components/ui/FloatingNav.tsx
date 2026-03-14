import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, MessageCircle, BookOpen, Terminal } from 'lucide-react'

export type AppMode = 'lab' | 'chat' | 'terminal' | 'story'

interface FloatingNavProps {
  currentMode: AppMode
  onModeChange: (mode: AppMode) => void
  visible: boolean
}

const modes: { id: AppMode; icon: React.ReactNode; label: string }[] = [
  { id: 'lab', icon: <FlaskConical size={16} />, label: 'Lab' },
  { id: 'chat', icon: <MessageCircle size={16} />, label: 'Ask Abhinay' },
  { id: 'story', icon: <BookOpen size={16} />, label: 'Story' },
  { id: 'terminal', icon: <Terminal size={16} />, label: 'Terminal' },
]

export function FloatingNav({ currentMode, onModeChange, visible }: FloatingNavProps) {
  const [hoveredId, setHoveredId] = useState<AppMode | null>(null)

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            borderRadius: '9999px',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {modes.map((mode) => {
            const isActive = currentMode === mode.id
            const isHovered = hoveredId === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                onMouseEnter={() => setHoveredId(mode.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 500,
                  color: isActive ? '#F1F5F9' : isHovered ? '#CBD5E1' : '#64748B',
                  background: 'transparent',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                }}
              >
                {/* Animated active pill behind text */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '9999px',
                      background: 'rgba(255, 107, 53, 0.12)',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover background */}
                {!isActive && isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '9999px',
                      background: 'rgba(42, 63, 95, 0.25)',
                      zIndex: -1,
                    }}
                  />
                )}
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive
                    ? mode.id === 'terminal' ? '#4ADE80' : '#FF6B35'
                    : undefined,
                }}>
                  {mode.icon}
                </span>
                <span>{mode.label}</span>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
