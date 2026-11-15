import { BookHeart, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="about" className="bg-ink-900 text-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral-500 text-white">
                <BookHeart className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-cream-50">
                ALIBI
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cream-100/70">
              Your life, in little moments. A warm home for the photos and
              stories you never want to lose.
            </p>
          </div>

          <div className="flex gap-16 sm:gap-20">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-100/50">
                Explore
              </h3>
              <ul className="mt-4 space-y-3 text-sm font-semibold">
                <li>
                  <a href="#stories" className="transition-colors hover:text-butter-300">
                    Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="transition-colors hover:text-butter-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#top" className="transition-colors hover:text-butter-300">
                    Start a Story
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-100/50">
                Say Hello
              </h3>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: Mail, label: 'Email ALIBI' },
                  { icon: Instagram, label: 'ALIBI on Instagram' },
                  { icon: Twitter, label: 'ALIBI on Twitter' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#top"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-100/10 pt-6">
          <p className="text-xs text-cream-100/50">
            © 2026 ALIBI. Made with care for the little moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
