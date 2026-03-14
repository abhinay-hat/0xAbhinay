import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { X } from 'lucide-react'
import { labObjects, type LabObject } from '../../data/lab-objects'
import { ObjectPanel } from './ObjectPanel'
import type { AppMode } from '../ui/FloatingNav'

interface IsometricRoomProps {
  onModeChange: (mode: AppMode) => void
}

// Stable particle data generated once
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  size: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  color: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#00D4FF' : '#FFB347',
  left: `${(i * 2.857) % 100}%`,
  top: `${(i * 3.141) % 100}%`,
  opacity: 0.1 + (i % 5) * 0.06,
  duration: 3 + (i % 5) * 1.2,
  delay: (i % 7) * 0.5,
}))

export function IsometricRoom({ onModeChange }: IsometricRoomProps) {
  const [selectedObject, setSelectedObject] = useState<LabObject | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const roomX = useTransform(springX, [-1, 1], [-8, 8])
  const roomY = useTransform(springY, [-1, 1], [-5, 5])
  const particleX = useTransform(springX, [-1, 1], [12, -12])
  const particleY = useTransform(springY, [-1, 1], [8, -8])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleObjectClick = (obj: LabObject) => {
    if (obj.id === 'robot') { onModeChange('chat'); return }
    if (obj.id === 'window') { onModeChange('story'); return }
    if (obj.id === 'terminal-screen') { onModeChange('terminal'); return }
    setSelectedObject(obj)
  }

  const hoverProps = (id: string) => ({
    className: 'cursor-pointer' as const,
    onClick: () => handleObjectClick(labObjects.find(o => o.id === id)!),
    onMouseEnter: () => setHoveredId(id),
    onMouseLeave: () => setHoveredId(null),
  })

  const isHovered = (id: string) => hoveredId === id
  const stroke = (id: string) => isHovered(id) ? '#FF6B35' : '#2A3F5F'
  const sw = (id: string) => isHovered(id) ? 2.5 : 1

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 45%, #1A1A2E 0%, #0F0F1A 65%)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Ambient particles — parallax layer */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ x: particleX, y: particleY }}
      >
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
            }}
            animate={{ opacity: [p.opacity * 0.5, p.opacity * 2, p.opacity * 0.5] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </motion.div>

      {/* Animated ambient glow orbs */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '50%',
          height: '50%',
          left: '25%',
          top: '15%',
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          width: '40%',
          height: '40%',
          left: '50%',
          top: '30%',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Isometric Room SVG — with entrance + parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ padding: '60px 20px 80px', x: roomX, y: roomY }}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <svg
          viewBox="0 0 900 650"
          className="w-full h-full"
          style={{
            maxWidth: '1100px',
            maxHeight: '100%',
            filter: selectedObject ? 'blur(6px) brightness(0.4)' : 'none',
            transition: 'filter 0.4s ease',
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* SVG filter for glow effects */}
          <defs>
            <filter id="screenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          <g transform="translate(450, 310)">
            {/* ========== ROOM STRUCTURE ========== */}

            {/* Floor glow underneath */}
            <ellipse cx="0" cy="140" rx="250" ry="100" fill="#00D4FF" opacity="0.008" />

            {/* Floor */}
            <path d="M-300,110 L0,-40 L300,110 L0,260 Z" fill="#0F0F1A" stroke="#2A3F5F" strokeWidth="0.5" />
            {/* Floor subtle grid */}
            <path d="M-150,35 L150,35" stroke="#2A3F5F" strokeWidth="0.3" opacity="0.3" />
            <path d="M-200,72 L200,72" stroke="#2A3F5F" strokeWidth="0.3" opacity="0.2" />
            <path d="M0,-40 L0,260" stroke="#2A3F5F" strokeWidth="0.3" opacity="0.15" />
            {/* Additional floor grid lines */}
            <path d="M-100,-2 L100,-2" stroke="#2A3F5F" strokeWidth="0.2" opacity="0.12" />
            <path d="M-250,110 L250,110" stroke="#2A3F5F" strokeWidth="0.2" opacity="0.08" />
            <path d="M-150,185 L150,185" stroke="#2A3F5F" strokeWidth="0.2" opacity="0.06" />

            {/* Back wall left */}
            <path d="M-300,-150 L0,-300 L0,-40 L-300,110 Z" fill="#16213E" stroke="#2A3F5F" strokeWidth="1" />
            {/* Back wall right */}
            <path d="M0,-300 L300,-150 L300,110 L0,-40 Z" fill="#1A1A2E" stroke="#2A3F5F" strokeWidth="1" />

            {/* Warm edge glow on walls */}
            <path d="M0,-300 L0,-40" stroke="#FF6B35" strokeWidth="1" opacity="0.2">
              <animate attributeName="opacity" values="0.12;0.25;0.12" dur="4s" repeatCount="indefinite" />
            </path>

            {/* ========== LEFT WALL OBJECTS ========== */}

            {/* Window */}
            <g {...hoverProps('window')}>
              <path d="M-220,-90 L-80,-160 L-80,-40 L-220,30 Z"
                fill={isHovered('window') ? '#1E2D4A' : '#16213E'}
                stroke={stroke('window')} strokeWidth={sw('window')}
              />
              {/* Night sky */}
              <path d="M-210,-82 L-90,-148 L-90,-48 L-210,18 Z" fill="#080810" />
              {/* Moon with glow */}
              <circle cx="-130" cy="-120" r="10" fill="#FFB347" opacity="0.08" filter="url(#softGlow)" />
              <circle cx="-130" cy="-120" r="6" fill="#FFB347" opacity="0.7" />
              {/* Stars with twinkle */}
              <circle cx="-180" cy="-60" r="1" fill="#FFB347" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="-160" cy="-100" r="1.5" fill="#00D4FF" opacity="0.5">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="-120" cy="-75" r="1" fill="#F1F5F9" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="-190" cy="-100" r="0.8" fill="#FFB347" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="-105" cy="-130" r="0.7" fill="#F1F5F9" opacity="0.3">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="5s" repeatCount="indefinite" />
              </circle>
              {/* City silhouette */}
              <path d="M-210,10 L-200,-10 L-190,-5 L-180,-20 L-165,-15 L-150,-28 L-140,-12 L-125,-18 L-110,-8 L-90,-15 L-90,18 L-210,18 Z"
                fill="#1A1A2E" opacity="0.9" />
              {/* City window lights */}
              <rect x="-195" y="-6" width="2" height="2" fill="#FFB347" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
              </rect>
              <rect x="-175" y="-16" width="2" height="2" fill="#FFB347" opacity="0.3">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="5s" repeatCount="indefinite" delay="1s" />
              </rect>
              <rect x="-145" y="-24" width="2" height="2" fill="#00D4FF" opacity="0.3">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="-120" y="-14" width="2" height="2" fill="#FFB347" opacity="0.25">
                <animate attributeName="opacity" values="0.15;0.45;0.15" dur="6s" repeatCount="indefinite" />
              </rect>
              {/* Window frame cross */}
              <line x1="-150" y1="-115" x2="-150" y2="-15" stroke="#2A3F5F" strokeWidth="1" opacity="0.4" />
              <line x1="-210" y1="-30" x2="-90" y2="-96" stroke="#2A3F5F" strokeWidth="1" opacity="0.4" />
              {/* Moonlight spill on floor */}
              <path d="M-220,30 L-200,20 L-150,55 L-180,70 Z" fill="#FFB347" opacity="0.012" />
            </g>

            {/* Poster */}
            <g {...hoverProps('poster')}>
              <path d="M-145,-190 L-60,-230 L-60,-165 L-145,-125 Z"
                fill={isHovered('poster') ? '#2A3F5F' : '#1E2D4A'}
                stroke={isHovered('poster') ? '#FF6B35' : '#FFB347'} strokeWidth={sw('poster')}
              />
              {/* Poster content */}
              <text x="-102" y="-185" fill="#FF6B35" fontSize="7" fontFamily="'Syne', sans-serif"
                transform="rotate(-27, -102, -185)" textAnchor="middle" fontWeight="bold">SHIP IT</text>
              <text x="-102" y="-165" fill="#FFB347" fontSize="4" fontFamily="'JetBrains Mono', monospace"
                transform="rotate(-27, -102, -165)" textAnchor="middle">then fix it</text>
            </g>

            {/* ========== RIGHT WALL OBJECTS ========== */}

            {/* Bookshelf */}
            <g {...hoverProps('bookshelf')}>
              <path d="M140,-220 L240,-170 L240,-30 L140,-80 Z"
                fill={isHovered('bookshelf') ? '#2A3F5F' : '#1E2D4A'}
                stroke={stroke('bookshelf')} strokeWidth={sw('bookshelf')}
              />
              {/* Shelves */}
              <line x1="145" y1="-125" x2="238" y2="-78" stroke="#2A3F5F" strokeWidth="1" />
              <line x1="145" y1="-75" x2="238" y2="-28" stroke="#2A3F5F" strokeWidth="0.5" opacity="0.5" />
              {/* Books */}
              <rect x="152" y="-210" width="8" height="32" rx="1" fill="#FF6B35" opacity="0.8" transform="skewY(27)" />
              <rect x="163" y="-205" width="7" height="28" rx="1" fill="#00D4FF" opacity="0.7" transform="skewY(27)" />
              <rect x="173" y="-207" width="8" height="30" rx="1" fill="#FFB347" opacity="0.75" transform="skewY(27)" />
              <rect x="184" y="-203" width="6" height="26" rx="1" fill="#4ADE80" opacity="0.65" transform="skewY(27)" />
              <rect x="193" y="-206" width="8" height="29" rx="1" fill="#7C3AED" opacity="0.6" transform="skewY(27)" />
              {/* Lower shelf books */}
              <rect x="155" y="-155" width="7" height="25" rx="1" fill="#FFB347" opacity="0.5" transform="skewY(27)" />
              <rect x="165" y="-152" width="8" height="22" rx="1" fill="#FF6B35" opacity="0.45" transform="skewY(27)" />
              <rect x="176" y="-154" width="6" height="24" rx="1" fill="#00D4FF" opacity="0.5" transform="skewY(27)" />
            </g>

            {/* CRT Terminal */}
            <g {...hoverProps('terminal-screen')}>
              <rect x="180" y="-138" width="48" height="35" rx="4"
                fill="#080810"
                stroke={isHovered('terminal-screen') ? '#4ADE80' : '#2A3F5F'}
                strokeWidth={sw('terminal-screen')}
              />
              {/* Screen glow */}
              <rect x="180" y="-138" width="48" height="35" rx="4" fill="#4ADE80" opacity="0.03">
                <animate attributeName="opacity" values="0.02;0.06;0.02" dur="2s" repeatCount="indefinite" />
              </rect>
              {/* Screen content */}
              <rect x="184" y="-134" width="40" height="27" rx="2" fill="#0A0A14" />
              {/* Terminal text */}
              <text x="190" y="-120" fill="#4ADE80" fontSize="5" fontFamily="'JetBrains Mono', monospace" opacity="0.8">$ _</text>
              <text x="190" y="-112" fill="#4ADE80" fontSize="4" fontFamily="'JetBrains Mono', monospace" opacity="0.4">ready</text>
              {/* Blinking cursor */}
              <rect x="205" y="-124" width="4" height="6" fill="#4ADE80" opacity="0.9">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
              </rect>
              {/* CRT stand */}
              <rect x="196" y="-103" width="16" height="5" rx="1" fill="#1E2D4A" stroke="#2A3F5F" strokeWidth="0.5" />
            </g>

            {/* ========== DESK ========== */}
            <g>
              {/* Desk top */}
              <path d="M-100,25 L60,-55 L200,25 L40,105 Z" fill="#1E2D4A" stroke="#2A3F5F" strokeWidth="1" />
              {/* Desk front */}
              <path d="M-100,25 L-100,50 L40,130 L40,105 Z" fill="#16213E" stroke="#2A3F5F" strokeWidth="0.5" />
              {/* Desk side */}
              <path d="M40,105 L40,130 L200,50 L200,25 Z" fill="#1A1A2E" stroke="#2A3F5F" strokeWidth="0.5" />
            </g>

            {/* ========== ON-DESK OBJECTS ========== */}

            {/* Monitor 1 (left) — Projects */}
            <g {...hoverProps('monitors')}>
              {/* Monitor frame */}
              <path d="M-50,-25 L30,-65 L30,-5 L-50,35 Z"
                fill="#080810" stroke={stroke('monitors')} strokeWidth={sw('monitors')}
              />
              {/* Screen */}
              <path d="M-44,-20 L24,-57 L24,-10 L-44,27 Z" fill="#0A0F1C" />
              {/* Screen glow */}
              <path d="M-44,-20 L24,-57 L24,-10 L-44,27 Z" fill="#00D4FF" opacity="0.06">
                <animate attributeName="opacity" values="0.03;0.1;0.03" dur="3s" repeatCount="indefinite" />
              </path>
              {/* Code lines — animated typing */}
              <line x1="-38" y1="-10" x2="-10" y2="-24" stroke="#00D4FF" strokeWidth="1.5" opacity="0.5" />
              <line x1="-38" y1="0" x2="-15" y2="-12" stroke="#4ADE80" strokeWidth="1.5" opacity="0.4" />
              <line x1="-38" y1="10" x2="-5" y2="-3" stroke="#FF6B35" strokeWidth="1" opacity="0.3" />
              <line x1="-35" y1="17" x2="-12" y2="5" stroke="#00D4FF" strokeWidth="1" opacity="0.25" />
              {/* Blinking cursor on screen */}
              <rect x="-8" y="2" width="3" height="5" fill="#00D4FF" opacity="0.7">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" repeatCount="indefinite" />
              </rect>
              {/* Screen light on desk */}
              <ellipse cx="-10" cy="45" rx="30" ry="8" fill="#00D4FF" opacity="0.015" />
              {/* Monitor stand */}
              <path d="M-12,35 L-12,27 L0,20 L0,28 Z" fill="#1E2D4A" />
              <path d="M-20,40 L0,30 L20,40 L0,50 Z" fill="#16213E" />
            </g>

            {/* Monitor 2 (right) — Dashboard */}
            <g {...hoverProps('whiteboard')}>
              <path d="M55,-50 L135,-90 L135,-30 L55,10 Z"
                fill="#080810" stroke={stroke('whiteboard')} strokeWidth={sw('whiteboard')}
              />
              <path d="M61,-46 L129,-83 L129,-35 L61,2 Z" fill="#0A0F1C" />
              {/* Screen glow */}
              <path d="M61,-46 L129,-83 L129,-35 L61,2 Z" fill="#FF6B35" opacity="0.04">
                <animate attributeName="opacity" values="0.02;0.06;0.02" dur="4s" repeatCount="indefinite" />
              </path>
              {/* Charts — animated growing */}
              <rect x="72" y="-42" width="5" height="16" rx="1" fill="#FF6B35" opacity="0.6" transform="skewY(-27)" />
              <rect x="82" y="-48" width="5" height="22" rx="1" fill="#FFB347" opacity="0.6" transform="skewY(-27)" />
              <rect x="92" y="-45" width="5" height="19" rx="1" fill="#00D4FF" opacity="0.6" transform="skewY(-27)" />
              <rect x="102" y="-50" width="5" height="24" rx="1" fill="#4ADE80" opacity="0.5" transform="skewY(-27)" />
              {/* Screen light on desk */}
              <ellipse cx="95" cy="18" rx="25" ry="6" fill="#FF6B35" opacity="0.012" />
              {/* Monitor stand */}
              <path d="M88,10 L88,3 L100,-3 L100,4 Z" fill="#1E2D4A" />
              <path d="M80,15 L100,5 L120,15 L100,25 Z" fill="#16213E" />
            </g>

            {/* Coffee mug */}
            <g {...hoverProps('coffee')}>
              <ellipse cx="155" cy="0" rx="10" ry="7"
                fill={isHovered('coffee') ? '#2A3F5F' : '#1E2D4A'}
                stroke={stroke('coffee')} strokeWidth="1.5"
              />
              <path d="M145,0 L145,-15 A10,7 0 0,1 165,-15 L165,0"
                fill={isHovered('coffee') ? '#2A3F5F' : '#1E2D4A'}
                stroke={stroke('coffee')} strokeWidth="1.5"
              />
              {/* Coffee liquid */}
              <ellipse cx="155" cy="-14" rx="8" ry="5" fill="#3D1F00" opacity="0.6" />
              {/* Steam — more dynamic */}
              <g opacity="0.5">
                <path d="M150,-17 Q148,-28 152,-35" fill="none" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate" values="0,0;-2,-5;0,0" dur="2.5s" repeatCount="indefinite" />
                </path>
                <path d="M155,-17 Q153,-30 157,-40" fill="none" stroke="#94A3B8" strokeWidth="0.8" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.05;0.4;0.05" dur="3.5s" repeatCount="indefinite" delay="0.5s" />
                  <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="3.5s" repeatCount="indefinite" />
                </path>
                <path d="M158,-17 Q156,-30 160,-38" fill="none" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.15;0.45;0.15" dur="3s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate" values="0,0;1,-5;0,0" dur="3s" repeatCount="indefinite" />
                </path>
              </g>
            </g>

            {/* Plant */}
            <g {...hoverProps('plant')}>
              {/* Pot */}
              <path d="M-75,5 L-75,25 L-60,30 L-60,10 Z" fill={isHovered('plant') ? '#2A3F5F' : '#1E2D4A'}
                stroke={stroke('plant')} strokeWidth="1" />
              <path d="M-75,5 L-60,10 L-45,5 L-60,0 Z" fill={isHovered('plant') ? '#334155' : '#1E2D4A'}
                stroke={stroke('plant')} strokeWidth="0.5" />
              {/* Leaves */}
              <path d="M-62,2 Q-65,-14 -54,-20" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" values="-2,-62,2;2,-62,2;-2,-62,2" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M-62,2 Q-60,-16 -70,-22" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" values="2,-62,2;-2,-62,2;2,-62,2" dur="3.5s" repeatCount="indefinite" />
              </path>
              <path d="M-62,2 Q-56,-10 -50,-14" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                <animateTransform attributeName="transform" type="rotate" values="0,-62,2;3,-62,2;0,-62,2" dur="5s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Headphones */}
            <g {...hoverProps('headphones')}>
              <path d="M115,18 Q115,5 127,5 Q139,5 139,18" fill="none"
                stroke={isHovered('headphones') ? '#FF6B35' : '#64748B'} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="115" cy="20" r="6" fill={isHovered('headphones') ? '#2A3F5F' : '#1E2D4A'}
                stroke={isHovered('headphones') ? '#FF6B35' : '#2A3F5F'} strokeWidth="1.5" />
              <circle cx="139" cy="20" r="6" fill={isHovered('headphones') ? '#2A3F5F' : '#1E2D4A'}
                stroke={isHovered('headphones') ? '#FF6B35' : '#2A3F5F'} strokeWidth="1.5" />
            </g>

            {/* Sticky notes on monitor */}
            <g {...hoverProps('sticky-notes')}>
              <rect x="-54" y="-32" width="12" height="12" rx="1.5" fill="#FF6B35"
                opacity={isHovered('sticky-notes') ? 0.95 : 0.65} transform="rotate(-5, -48, -26)" />
              <rect x="-40" y="-35" width="12" height="12" rx="1.5" fill="#FFB347"
                opacity={isHovered('sticky-notes') ? 0.95 : 0.65} transform="rotate(3, -34, -29)" />
              <rect x="-48" y="-22" width="12" height="12" rx="1.5" fill="#00D4FF"
                opacity={isHovered('sticky-notes') ? 0.95 : 0.65} transform="rotate(-2, -42, -16)" />
            </g>

            {/* ========== FLOOR OBJECTS ========== */}

            {/* Robot Pet (Byte) */}
            <g {...hoverProps('robot')}>
              <g transform="translate(-130, 140)">
                {/* Shadow */}
                <ellipse cx="0" cy="18" rx="22" ry="8" fill="#0A0A14" opacity="0.4" />
                {/* Body */}
                <rect x="-20" y="-22" width="40" height="32" rx="10" fill="#1E2D4A"
                  stroke={isHovered('robot') ? '#FF6B35' : '#2A3F5F'} strokeWidth={isHovered('robot') ? 2.5 : 1.5} />
                {/* Body shine */}
                <rect x="-16" y="-18" width="32" height="4" rx="2" fill="#2A3F5F" opacity="0.3" />
                {/* Eyes */}
                <rect x="-12" y="-12" width="8" height="8" rx="2" fill="#00D4FF">
                  <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
                </rect>
                <rect x="4" y="-12" width="8" height="8" rx="2" fill="#00D4FF">
                  <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
                </rect>
                {/* Eye glow */}
                <ellipse cx="0" cy="-8" rx="16" ry="8" fill="#00D4FF" opacity="0.04" />
                {/* Happy mouth */}
                <path d="M-6,2 Q0,7 6,2" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                {/* Antenna */}
                <line x1="0" y1="-22" x2="0" y2="-35" stroke="#2A3F5F" strokeWidth="2" />
                <circle cx="0" cy="-38" r="4.5" fill="#FF6B35">
                  <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Antenna glow */}
                <circle cx="0" cy="-38" r="10" fill="#FF6B35" opacity="0.06">
                  <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.04;0.08;0.04" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Feet */}
                <rect x="-16" y="10" width="12" height="6" rx="3" fill="#16213E" stroke="#2A3F5F" strokeWidth="1" />
                <rect x="4" y="10" width="12" height="6" rx="3" fill="#16213E" stroke="#2A3F5F" strokeWidth="1" />
              </g>
              {isHovered('robot') && (
                <g>
                  <rect x="-165" y="170" width="70" height="20" rx="8" fill="rgba(255,107,53,0.15)" stroke="#FF6B35" strokeWidth="1" />
                  <text x="-130" y="184" textAnchor="middle" fill="#FF6B35" fontSize="8" fontFamily="'JetBrains Mono', monospace">
                    Chat with me!
                  </text>
                </g>
              )}
            </g>

            {/* Floor rug */}
            <g {...hoverProps('rug')}>
              <path d="M-30,150 L50,110 L130,150 L50,190 Z"
                fill={isHovered('rug') ? 'rgba(42,63,95,0.3)' : 'rgba(26,26,46,0.5)'}
                stroke={isHovered('rug') ? '#FF6B35' : '#2A3F5F'}
                strokeWidth="1"
                strokeDasharray={isHovered('rug') ? '0' : '4 2'}
              />
              {/* Rug pattern */}
              <path d="M10,150 L50,130 L90,150 L50,170 Z" fill="none" stroke="#FF6B35" strokeWidth="0.5" opacity="0.15" />
              <path d="M30,150 L50,140 L70,150 L50,160 Z" fill="none" stroke="#FFB347" strokeWidth="0.5" opacity="0.1" />
            </g>

            {/* ========== AMBIENT DETAILS ========== */}

            {/* Warm light cone from desk area */}
            <ellipse cx="50" cy="30" rx="120" ry="60" fill="#FFB347" opacity="0.018">
              <animate attributeName="opacity" values="0.012;0.022;0.012" dur="5s" repeatCount="indefinite" />
            </ellipse>

            {/* Reflection on floor */}
            <path d="M-50,110 L50,70 L150,110 L50,150 Z" fill="#00D4FF" opacity="0.008" />

          </g>
        </svg>
      </motion.div>

      {/* Object labels on hover */}
      <AnimatePresence>
        {hoveredId && !selectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 glass z-50"
            style={{
              borderRadius: '16px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,107,53,0.1)',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
              }}
            >
              {labObjects.find(o => o.id === hoveredId)?.icon}
            </div>
            <div>
              <p style={{ color: '#F1F5F9', fontSize: '0.9rem', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>
                {labObjects.find(o => o.id === hoveredId)?.label}
              </p>
              <p style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                {labObjects.find(o => o.id === hoveredId)?.description}
              </p>
            </div>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                color: '#FF6B35',
                fontSize: '0.7rem',
                fontFamily: "'JetBrains Mono', monospace",
                marginLeft: '4px',
                flexShrink: 0,
              }}
            >
              click
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Object Panel Overlay */}
      <AnimatePresence>
        {selectedObject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              onClick={() => setSelectedObject(null)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[55%] lg:w-[45%] z-50 glass-dark overflow-y-auto"
            >
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'rgba(255, 107, 53, 0.1)',
                        border: '1px solid rgba(255, 107, 53, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0,
                      }}
                    >
                      {selectedObject.icon}
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F1F5F9' }}>
                        {selectedObject.label}
                      </h2>
                      <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{selectedObject.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedObject(null)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#64748B', cursor: 'pointer',
                      background: 'rgba(42, 63, 95, 0.3)',
                      border: '1px solid rgba(42, 63, 95, 0.5)',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 107, 53, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'
                      e.currentTarget.style.color = '#FF6B35'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(42, 63, 95, 0.3)'
                      e.currentTarget.style.borderColor = 'rgba(42, 63, 95, 0.5)'
                      e.currentTarget.style.color = '#64748B'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <ObjectPanel object={selectedObject} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          color: '#64748B', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace",
          opacity: 0.4, textAlign: 'center',
          padding: '8px 20px',
          borderRadius: '12px',
          background: 'rgba(15, 15, 26, 0.5)',
          border: '1px solid rgba(42, 63, 95, 0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        click any object to explore · press ` for terminal
      </motion.div>
    </div>
  )
}
