import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FloatingNav, type AppMode } from './components/ui/FloatingNav'
import { ModeSelector } from './components/ui/ModeSelector'
import { IsometricRoom } from './components/lab/IsometricRoom'
import { TerminalOverlay } from './components/terminal/TerminalOverlay'
import { ChatWindow } from './components/chat/ChatWindow'
import { StoryScroll } from './components/story/StoryScroll'

function App() {
  const [mode, setMode] = useState<AppMode | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  const handleModeSelect = useCallback((selected: AppMode) => {
    setShowIntro(false)
    setMode(selected)
  }, [])

  // Backtick shortcut for terminal, Escape to go back
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`' && mode !== 'terminal') {
        e.preventDefault()
        handleModeSelect('terminal')
      }
      if (e.key === 'Escape') {
        if (mode === 'terminal' || mode === 'chat' || mode === 'story') {
          setMode('lab')
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [mode, handleModeSelect])

  return (
    <div className="min-h-screen bg-bg-deep">
      {/* Mode selector (intro screen) */}
      <AnimatePresence>
        {showIntro && <ModeSelector onSelect={handleModeSelect} />}
      </AnimatePresence>

      {/* Floating nav (after intro, not in terminal) */}
      <FloatingNav
        currentMode={mode || 'lab'}
        onModeChange={handleModeSelect}
        visible={!showIntro && mode !== 'terminal'}
      />

      {/* Lab is always rendered behind chat */}
      {(mode === 'lab' || mode === 'chat') && (
        <IsometricRoom onModeChange={handleModeSelect} />
      )}

      {/* Story mode */}
      <AnimatePresence mode="wait">
        {mode === 'story' && (
          <StoryScroll key="story" onBackToLab={() => setMode('lab')} />
        )}
      </AnimatePresence>

      {/* Terminal overlay (on top of everything) */}
      <AnimatePresence>
        {mode === 'terminal' && (
          <TerminalOverlay key="terminal" onExit={() => setMode('lab')} />
        )}
      </AnimatePresence>

      {/* Chat panel (overlays on lab) */}
      <AnimatePresence>
        {mode === 'chat' && (
          <ChatWindow key="chat" onClose={() => setMode('lab')} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
