const QUOTE =
  'I build intelligent systems that turn raw data into products people actually use.'
const STATUS = 'COMING SOON'

function PunchStrip() {
  return (
    <div
      className="pointer-events-none absolute top-6 right-6 z-20 hidden gap-1.5 sm:flex md:top-10 md:right-12"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="block size-3 rounded-[2px] border border-[color-mix(in_srgb,var(--color-weft)_55%,transparent)] bg-[color-mix(in_srgb,var(--color-weft)_18%,transparent)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-cream)_25%,transparent)]"
          style={{ opacity: 0.45 + (i % 3) * 0.15 }}
        />
      ))}
    </div>
  )
}

function WeaveMotif() {
  return (
    <svg
      className="mt-3 w-[min(20rem,78vw)] text-[var(--color-weft)] opacity-80"
      viewBox="0 0 360 48"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={8 + i * 5} x2="168" y2={8 + i * 5} />
        ))}
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => (
            <rect
              key={`c-${row}-${col}`}
              x={176 + col * 10}
              y={6 + row * 6}
              width="8"
              height="5"
              fill={
                (row + col) % 2 === 0
                  ? 'color-mix(in srgb, currentColor 55%, transparent)'
                  : 'transparent'
              }
              stroke="currentColor"
            />
          )),
        )}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`t-${i}`}
            x1={244}
            y1={10 + i * 7}
            x2={244 + 40 + i * 18}
            y2={10 + i * 7}
            strokeDasharray="6 5"
            opacity={0.7 - i * 0.08}
          />
        ))}
      </g>
    </svg>
  )
}

function ComingSoonStatus() {
  return (
    <p className="ledger text-sm tracking-[0.18em] md:text-base" aria-label="Coming soon">
      {Array.from(STATUS).map((ch, i) => (
        <span key={i} className="flap-char" style={{ animationDelay: `${i * 45}ms` }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </p>
  )
}

export default function App() {
  return (
    <main className="silk-ground relative min-h-[100dvh] overflow-hidden">
      <PunchStrip />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[92rem] grid-rows-[auto_1fr_auto] px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-12 lg:px-20">
        <header>
          <p className="ledger text-left text-[11px] text-[color-mix(in_srgb,var(--color-weft)_88%,var(--color-cream))] sm:text-xs">
            Abhinay Padidam · Product AI Engineer
          </p>
        </header>

        <section className="flex items-center py-6 md:py-8">
          <h1 className="weft-quote m-0 max-w-[16rem] text-[clamp(2rem,5.4vw,4.75rem)] sm:max-w-[28rem] md:max-w-[36rem] lg:max-w-[42rem]">
            {QUOTE}
          </h1>
        </section>

        <footer className="pb-2 pt-4">
          <ComingSoonStatus />
          <WeaveMotif />
        </footer>
      </div>
    </main>
  )
}
