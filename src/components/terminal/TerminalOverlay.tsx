import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { commands } from '../../data/terminal-commands'

interface TerminalOverlayProps {
  onExit: () => void
}

interface TerminalLine {
  type: 'input' | 'output' | 'boot'
  text: string
}

const BOOT_SEQUENCE = [
  'ABHINAY OS v2.0',
  'Loading personality module... Done.',
  'Loading experiments... Done.',
  'Loading chai reserves... ████████████ 100%',
  '',
  'Type "help" for available commands.',
  '',
]

const THEME_COLORS: Record<string, string> = {
  green: '#4ADE80',
  cyan: '#00D4FF',
  amber: '#FFB347',
  orange: '#FF6B35',
}

const FONT_FAMILY = "'JetBrains Mono', monospace"

export function TerminalOverlay({ onExit }: TerminalOverlayProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [booted, setBooted] = useState(false)
  const [themeColor, setThemeColor] = useState('#4ADE80')
  const [showMatrix, setShowMatrix] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Boot sequence
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, { type: 'boot', text: BOOT_SEQUENCE[i] }])
        i++
      } else {
        clearInterval(timer)
        setBooted(true)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  // Focus input
  useEffect(() => {
    if (booted) inputRef.current?.focus()
  }, [booted])

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setLines(prev => [...prev, { type: 'input', text: trimmed }])
    setHistory(prev => [trimmed, ...prev])
    setHistoryIndex(-1)

    const parts = trimmed.split(' ')
    const cmdName = parts[0].toLowerCase()
    const args = parts.slice(1)

    const cmd = commands.find(c => c.name === cmdName)
    if (!cmd) {
      setLines(prev => [...prev, { type: 'output', text: `  command not found: ${cmdName}. Type "help" for commands.` }])
      return
    }

    const result = cmd.handler(args)

    if (typeof result === 'string') {
      setLines(prev => [...prev, { type: 'output', text: result }])
    } else if (result && typeof result === 'object' && 'type' in result) {
      const special = result as { type: string; action: string }
      switch (special.action) {
        case 'clear':
          setLines([])
          break
        case 'exit':
          setLines(prev => [...prev, { type: 'output', text: "  Thanks for exploring! See you around. 👋" }])
          setTimeout(onExit, 1000)
          break
        case 'download-resume':
          setLines(prev => [...prev, { type: 'output', text: "  ⬇ Permission granted. Downloading resume..." }])
          // Trigger download
          const link = document.createElement('a')
          link.href = '/resume.pdf'
          link.download = 'Abhinay_Padidam_Resume.pdf'
          link.click()
          break
        case 'matrix':
          setShowMatrix(true)
          setTimeout(() => setShowMatrix(false), 3500)
          break
        default:
          if (special.action.startsWith('theme-')) {
            const color = special.action.replace('theme-', '')
            setThemeColor(THEME_COLORS[color] || '#4ADE80')
            setLines(prev => [...prev, { type: 'output', text: `  Theme changed to ${color}.` }])
          }
      }
    }
  }, [onExit])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIdx = historyIndex + 1
        setHistoryIndex(newIdx)
        setInput(history[newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1
        setHistoryIndex(newIdx)
        setInput(history[newIdx])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="crt-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 80,
        backgroundColor: '#0F0F1A',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix rain overlay */}
      <AnimatePresence>
        {showMatrix && <MatrixRain color={themeColor} />}
      </AnimatePresence>

      <div
        ref={scrollRef}
        style={{
          height: '100%',
          overflowY: 'auto',
          padding: '1.5rem',
          paddingBottom: '5rem',
          fontFamily: FONT_FAMILY,
          fontSize: '0.875rem',
          lineHeight: '1.625',
          color: themeColor,
        }}
      >
        {/* Lines */}
        {lines.map((line, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap' }}>
            {line.type === 'input' ? (
              <span>
                <span style={{ color: '#FF6B35' }}>abhinay</span>
                <span style={{ color: '#64748B' }}>@</span>
                <span style={{ color: themeColor }}>lab</span>
                <span style={{ color: '#64748B' }}>:~$ </span>
                {line.text}
              </span>
            ) : (
              <span style={{ color: line.type === 'boot' ? '#64748B' : themeColor }}>
                {line.text}
              </span>
            )}
          </div>
        ))}

        {/* Input line */}
        {booted && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>
              <span style={{ color: '#FF6B35' }}>abhinay</span>
              <span style={{ color: '#64748B' }}>@</span>
              <span style={{ color: themeColor }}>lab</span>
              <span style={{ color: '#64748B' }}>:~$ </span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                outline: 'none',
                border: 'none',
                color: themeColor,
                fontFamily: FONT_FAMILY,
                fontSize: '0.875rem',
                lineHeight: '1.625',
                caretColor: themeColor,
                padding: 0,
              }}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>

      {/* Exit hint */}
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1.5rem',
          color: 'rgba(100, 116, 139, 0.35)',
          fontSize: '0.7rem',
          fontFamily: FONT_FAMILY,
          padding: '6px 14px',
          borderRadius: '8px',
          background: 'rgba(42, 63, 95, 0.15)',
          border: '1px solid rgba(42, 63, 95, 0.2)',
        }}
      >
        type "exit" or press ESC to return
      </div>
    </motion.div>
  )
}

function MatrixRain({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 16)
    const drops = Array(columns).fill(1)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()アイウエオカキクケコ'

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 15, 26, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = color
      ctx.font = '14px JetBrains Mono, monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 16, drops[i] * 16)
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 40)
    return () => clearInterval(interval)
  }, [color])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    />
  )
}
