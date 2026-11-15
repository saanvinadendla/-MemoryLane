import { Heart } from 'lucide-react';
import type { Memory } from '@/data/memories';

const accentStyles: Record<
  Memory['accent'],
  { card: string; tag: string; tape: string }
> = {
  lavender: {
    card: 'hover:rotate-0 bg-lavender-100',
    tag: 'bg-lavender-200 text-lavender-500',
    tape: 'bg-lavender-300/80',
  },
  blush: {
    card: 'hover:rotate-0 bg-blush-100',
    tag: 'bg-blush-200 text-blush-500',
    tape: 'bg-blush-300/80',
  },
  coral: {
    card: 'hover:rotate-0 bg-coral-100',
    tag: 'bg-coral-200 text-coral-500',
    tape: 'bg-coral-300/80',
  },
  butter: {
    card: 'hover:rotate-0 bg-butter-100',
    tag: 'bg-butter-200 text-butter-500',
    tape: 'bg-butter-300/80',
  },
};

const tiltClass: Record<Memory['tilt'], string> = {
  1: 'scrapbook-tilt-1',
  2: 'scrapbook-tilt-2',
  3: 'scrapbook-tilt-3',
  4: 'scrapbook-tilt-4',
};

const spanClass: Record<Memory['span'], string> = {
  tall: 'sm:row-span-2 aspect-[3/4]',
  wide: 'sm:col-span-2 aspect-[16/10]',
  regular: 'aspect-[4/3]',
};

interface MemoryCardProps {
  memory: Memory;
  liked: boolean;
  onToggleLike: () => void;
}

export default function MemoryCard({
  memory,
  liked,
  onToggleLike,
}: MemoryCardProps) {
  const accent = accentStyles[memory.accent];

  return (
    <article
      className={`group relative flex flex-col rounded-3xl border border-cream-300/70 p-3 pb-5 shadow-card transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:shadow-card-hover sm:hover:rotate-[0.5deg] ${accent.card} ${tiltClass[memory.tilt]} ${spanClass[memory.span]}`}
    >
      <div
        aria-hidden
        className={`absolute -top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-sm opacity-90 shadow-sm ${accent.tape}`}
      />

      <div className="relative flex-1 overflow-hidden rounded-2xl">
        <img
          src={memory.image}
          alt={memory.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${accent.tag}`}
        >
          {memory.emojiTag}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3 px-2 pt-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink-900">
            {memory.title}
          </h3>
          <time className="mt-0.5 block text-xs font-bold uppercase tracking-widest text-ink-700/70">
            {memory.date}
          </time>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {memory.caption}
          </p>
        </div>
        <button
          onClick={onToggleLike}
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={liked}
          className={`shrink-0 rounded-full p-2.5 transition-all duration-300 ${
            liked
              ? 'bg-blush-200 text-blush-500'
              : 'bg-white/70 text-ink-700/50 hover:bg-blush-100 hover:text-blush-500'
          }`}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={2.2}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
      </div>
    </article>
  );
}
