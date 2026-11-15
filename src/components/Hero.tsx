import { ArrowRight, Sparkles, Heart, Camera, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden paper-dots"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lavender-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-blush-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-butter-200/40 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-coral-300/70 bg-coral-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-coral-500">
          <Sparkles className="h-3.5 w-3.5" />
          A scrapbook for your whole life
        </span>

        <h1
          id="hero-heading"
          className="animate-fade-up mt-6 max-w-3xl font-display text-5xl font-medium leading-[110%] text-ink-900 sm:text-6xl md:text-7xl"
          style={{ animationDelay: '100ms' }}
        >
          Your life, in{' '}
          <em className="relative inline-block font-semibold italic text-coral-500">
            little
            <svg
              aria-hidden
              viewBox="0 0 220 22"
              className="absolute -bottom-2 left-0 w-full text-butter-300"
              fill="none"
            >
              <path
                d="M4 16C50 6 120 4 216 12"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </em>{' '}
          moments.
        </h1>

        <p
          className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl"
          style={{ animationDelay: '200ms' }}
        >
          Gather your photos, dates, and tiny details into warm, beautiful
          stories you'll actually want to look back on.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: '300ms' }}
        >
          <a
            href="#/create"
            className="group inline-flex items-center gap-2.5 rounded-full bg-coral-500 px-8 py-4 text-base font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            ＋ Create Your First Story
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <span className="font-hand text-xl text-lavender-500">
            it takes about two minutes
          </span>
        </div>

        <div
          className="animate-fade-up mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink-700"
          style={{ animationDelay: '400ms' }}
        >
          {[
            { icon: Camera, label: '12,400+ moments saved' },
            { icon: Heart, label: 'Made for real memories' },
            { icon: Star, label: 'Loved by scrapbookers' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Icon className="h-4 w-4 text-coral-500" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
