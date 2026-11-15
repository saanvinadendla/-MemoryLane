import { useState } from 'react';
import { memories } from '@/data/memories';
import MemoryCard from '@/components/MemoryCard';

export default function MemoryGrid() {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="stories" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="font-hand text-2xl text-lavender-500">
            straight from the album
          </span>
          <h2 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Little moments, kept safe
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink-700">
          Every card is a memory someone wanted to keep. Tap the heart to save
          your favorites.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            liked={liked.has(memory.id)}
            onToggleLike={() => toggleLike(memory.id)}
          />
        ))}
      </div>
    </section>
  );
}
