import { useEffect, useRef, useState } from 'react';
import { BookHeart, Menu, X, Heart } from 'lucide-react';
import type { Page } from '@/hooks/useHashRoute';

export const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'My Memories', page: 'memories' },
  { label: 'Timeline', page: 'timeline' },
  { label: 'Create a Story', page: 'create' },
  { label: 'Friends', page: 'friends' },
  { label: 'A Little Support', page: 'support' },
  { label: 'Feel-Good Corner', page: 'feelgood' },
  { label: 'Profile & Settings', page: 'profile' },
];

const accentDot: Record<Page, string> = {
  home: 'bg-pink-300',
  memories: 'bg-lavender-300',
  timeline: 'bg-babyblue-300',
  create: 'bg-peach-300',
  friends: 'bg-mint-300',
  support: 'bg-blush-300',
  feelgood: 'bg-butter-300',
  profile: 'bg-lavender-300',
};

interface NavbarProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

export default function Navbar({ page, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300/60 bg-cream-50/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender-200 text-lavender-500 shadow-card transition-transform duration-300 hover:-rotate-6">
            <BookHeart className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink-900">
            ALIBI
          </span>
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream-200 text-ink-800 shadow-card transition-all duration-300 hover:bg-pink-200 hover:text-pink-500"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        ref={panelRef}
        className={`absolute right-4 top-[72px] z-50 w-72 overflow-hidden rounded-3xl border border-cream-300/70 bg-cream-50 shadow-card-hover transition-all duration-300 origin-top-right ${
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="p-3">
          {navLinks.map((link) => (
            <li key={link.page}>
              <button
                onClick={() => go(link.page)}
                aria-current={page === link.page ? 'page' : undefined}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors duration-200 ${
                  page === link.page
                    ? 'bg-pink-100 text-pink-500'
                    : 'text-ink-800 hover:bg-cream-200'
                }`}
              >
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-full ${accentDot[link.page]} ${
                    page === link.page ? '' : 'opacity-40'
                  }`}
                />
                {link.label}
                {page === link.page && (
                  <Heart className="ml-auto h-3.5 w-3.5" fill="currentColor" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
