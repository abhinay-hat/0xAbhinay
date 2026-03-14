import { motion } from 'framer-motion'

interface ByteProps {
  emotion?: 'idle' | 'thinking' | 'happy' | 'confused'
  size?: number
  className?: string
  onClick?: () => void
}

export function Byte({ emotion = 'idle', size = 80, className = '', onClick }: ByteProps) {
  const eyeVariants = {
    idle: { scaleY: 1 },
    thinking: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 },
    },
    happy: { scaleY: 1, y: -1 },
    confused: { scaleY: 0.7, rotate: 5 },
  }

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <rect x="16" y="28" width="48" height="36" rx="12" fill="#1E2D4A" stroke="#2A3F5F" strokeWidth="2" />
        <rect x="16" y="28" width="48" height="36" rx="12" fill="url(#byteGlow)" fillOpacity="0.3" />

        {/* Head shine */}
        <rect x="20" y="32" width="40" height="6" rx="3" fill="#2A3F5F" fillOpacity="0.5" />

        {/* Left Eye */}
        <motion.rect
          x="28" y="42" width="8" height="8" rx="2"
          fill="#00D4FF"
          variants={eyeVariants}
          animate={emotion}
          style={{ originX: '50%', originY: '50%' }}
        />
        {/* Right Eye */}
        <motion.rect
          x="44" y="42" width="8" height="8" rx="2"
          fill="#00D4FF"
          variants={eyeVariants}
          animate={emotion}
          style={{ originX: '50%', originY: '50%' }}
        />

        {/* Mouth */}
        {emotion === 'happy' ? (
          <path d="M34 54 Q40 58 46 54" stroke="#00D4FF" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : emotion === 'confused' ? (
          <line x1="34" y1="55" x2="46" y2="53" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <line x1="34" y1="54" x2="46" y2="54" stroke="#2A3F5F" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Antenna */}
        <line x1="40" y1="28" x2="40" y2="18" stroke="#2A3F5F" strokeWidth="2" />
        <motion.circle
          cx="40" cy="15" r="4"
          fill="#FF6B35"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Feet */}
        <rect x="24" y="64" width="12" height="6" rx="3" fill="#1E2D4A" stroke="#2A3F5F" strokeWidth="1.5" />
        <rect x="44" y="64" width="12" height="6" rx="3" fill="#1E2D4A" stroke="#2A3F5F" strokeWidth="1.5" />

        {/* Eye glow */}
        <ellipse cx="36" cy="46" rx="20" ry="10" fill="#00D4FF" opacity="0.06" />

        {/* Glow gradient */}
        <defs>
          <radialGradient id="byteGlow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
