import { motion } from 'framer-motion'
import { type LabObject } from '../../data/lab-objects'
import { Mail, Linkedin, Github } from 'lucide-react'

interface ObjectPanelProps {
  object: LabObject
}

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

// Shared style constants
const colors = {
  bgCard: 'rgba(30, 45, 74, 0.5)',
  border: 'rgba(42, 63, 95, 0.5)',
  orange: '#FF6B35',
  cyan: '#00D4FF',
  amber: '#FFB347',
  green: '#4ADE80',
  textBright: '#F1F5F9',
  textBody: '#CBD5E1',
  textMuted: '#64748B',
}

const fonts = {
  heading: "'Syne', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

const cardStyle: React.CSSProperties = {
  borderRadius: 16,
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  padding: 24,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
}

const cardStyleP5: React.CSSProperties = {
  ...cardStyle,
  padding: 20,
}

const cardStyleP4: React.CSSProperties = {
  ...cardStyle,
  padding: 16,
}

export function ObjectPanel({ object }: ObjectPanelProps) {
  const { content } = object

  switch (content.type) {
    case 'projects':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {content.items.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 style={{
                fontFamily: fonts.heading,
                fontWeight: 700,
                color: colors.textBright,
                fontSize: '1.125rem',
                margin: 0,
              }}>
                {project.title}
              </h3>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <span style={{
                    fontFamily: fonts.mono,
                    fontSize: '0.75rem',
                    color: colors.orange,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Problem
                  </span>
                  <p style={{ color: colors.textBody, fontSize: '0.875rem', marginTop: 4, marginBottom: 0 }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <span style={{
                    fontFamily: fonts.mono,
                    fontSize: '0.75rem',
                    color: colors.cyan,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Experiment
                  </span>
                  <p style={{ color: colors.textBody, fontSize: '0.875rem', marginTop: 4, marginBottom: 0 }}>
                    {project.experiment}
                  </p>
                </div>
                <div>
                  <span style={{
                    fontFamily: fonts.mono,
                    fontSize: '0.75rem',
                    color: colors.green,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Result
                  </span>
                  <p style={{ color: colors.textBody, fontSize: '0.875rem', marginTop: 4, marginBottom: 0 }}>
                    {project.result}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: 'rgba(42, 63, 95, 0.3)',
                    color: colors.textMuted,
                    fontSize: '0.75rem',
                    fontFamily: fonts.mono,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )

    case 'skills':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {content.domains.map((domain, i) => (
            <motion.div
              key={domain.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={cardStyleP5}
            >
              <h3 style={{
                fontFamily: fonts.heading,
                fontWeight: 600,
                color: colors.textBright,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: 0,
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors.orange,
                  display: 'inline-block',
                }} />
                {domain.name}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {domain.tools.map(tool => (
                  <span key={tool} style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: colors.cyan,
                    fontSize: '0.75rem',
                    fontFamily: fonts.mono,
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
              <p style={{
                color: colors.textMuted,
                fontSize: '0.75rem',
                marginTop: 12,
                marginBottom: 0,
                fontFamily: fonts.mono,
              }}>
                Projects: {domain.projects.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      )

    case 'personality':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {content.entries.map((entry, i) => (
            <motion.div
              key={entry.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={cardStyleP5}
            >
              <span style={{
                fontFamily: fonts.mono,
                fontSize: '0.75rem',
                color: colors.amber,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {entry.label}
              </span>
              <p style={{
                color: colors.textBright,
                fontSize: '1.125rem',
                fontFamily: fonts.heading,
                marginTop: 4,
                marginBottom: 0,
              }}>
                {entry.value}
              </p>
            </motion.div>
          ))}
        </div>
      )

    case 'quotes':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {content.items.map((quote, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={cardStyleP5}
            >
              <p style={{
                color: colors.textBright,
                fontSize: '1.125rem',
                fontFamily: fonts.heading,
                fontStyle: 'italic',
                lineHeight: 1.625,
                margin: 0,
              }}>
                "{quote}"
              </p>
            </motion.div>
          ))}
        </div>
      )

    case 'contact':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {content.links.map((link, i) => {
            const Icon = link.icon === 'mail' ? Mail : link.icon === 'linkedin' ? Linkedin : Github
            return (
              <motion.a
                key={link.label}
                href={link.url}
                target={link.icon !== 'mail' ? '_blank' : undefined}
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ y: -2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  borderRadius: 16,
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  padding: 20,
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.4)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'rgba(255, 107, 53, 0.1)',
                  border: '1px solid rgba(255, 107, 53, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.orange,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <p style={{
                    fontFamily: fonts.heading,
                    fontWeight: 600,
                    color: colors.textBright,
                    margin: 0,
                  }}>
                    {link.label}
                  </p>
                  <p style={{
                    color: colors.textMuted,
                    fontSize: '0.875rem',
                    margin: 0,
                  }}>
                    {link.url.replace('mailto:', '')}
                  </p>
                </div>
              </motion.a>
            )
          })}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              borderRadius: 12,
              background: 'rgba(255, 107, 53, 0.05)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              padding: 20,
              marginTop: 8,
            }}
          >
            <p style={{
              color: colors.orange,
              fontFamily: fonts.mono,
              fontSize: '0.875rem',
              margin: 0,
            }}>
              "Ping me. I'm open to anything."
            </p>
          </motion.div>
        </div>
      )

    case 'status':
      return (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.green,
                display: 'inline-block',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }} />
              <span style={{
                color: colors.green,
                fontFamily: fonts.mono,
                fontSize: '0.75rem',
              }}>
                CURRENTLY ACTIVE
              </span>
            </div>
            <p style={{
              color: colors.textBright,
              fontSize: '1.125rem',
              fontFamily: fonts.heading,
              lineHeight: 1.625,
              margin: 0,
            }}>
              {content.current}
            </p>
          </div>
        </motion.div>
      )

    case 'interests':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {content.items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                ...cardStyleP4,
              }}
            >
              <span style={{ color: colors.orange, marginTop: 2, flexShrink: 0 }}>▹</span>
              <p style={{ color: colors.textBody, margin: 0 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      )

    case 'meta':
      return (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <div style={cardStyle}>
            <p style={{
              color: colors.textMuted,
              fontSize: '0.875rem',
              marginTop: 0,
              marginBottom: 16,
            }}>
              This portfolio was built with:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {content.stack.map(tech => (
                <span key={tech} style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: 'rgba(255, 107, 53, 0.1)',
                  color: colors.orange,
                  fontSize: '0.875rem',
                  fontFamily: fonts.mono,
                  border: '1px solid rgba(255, 107, 53, 0.2)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
            <p style={{
              color: colors.textMuted,
              fontSize: '0.75rem',
              marginTop: 24,
              marginBottom: 0,
              fontFamily: fonts.mono,
            }}>
              "The site itself IS the proof that I build interesting things."
            </p>
          </div>
        </motion.div>
      )

    default:
      return null
  }
}
