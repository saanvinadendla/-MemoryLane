import { useState } from 'react';
import { Sparkles, Wand2, Type as TypeIcon, FileText, Check } from 'lucide-react';
import type { Story } from '@/types/story';

interface GenerateStepProps {
  story: Story;
  onGenerate: () => void;
}

export default function GenerateStep({ story, onGenerate }: GenerateStepProps) {
  const [done, setDone] = useState(false);

  const titlePending = !story.title.trim();
  const introPending = !story.intro.trim();
  const captionPending = story.photos.some((p) => !p.caption.trim());

  const run = () => {
    onGenerate();
    setDone(true);
  };

  const tasks = [
    { icon: TypeIcon, label: 'A creative story title', pending: titlePending },
    { icon: FileText, label: 'A short introduction', pending: introPending },
    { icon: Wand2, label: `Captions for ${story.photos.length} photo${story.photos.length === 1 ? '' : 's'}`, pending: captionPending },
  ];

  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-butter-200 text-butter-500">
        <Sparkles className="h-7 w-7" strokeWidth={2} />
      </span>
      <h2 className="mt-5 font-display text-3xl font-medium text-ink-900">
        Ready when you are
      </h2>
      <p className="mt-2 text-ink-700">
        We'll fill in whatever's missing — a title, an introduction, and
        captions for your photos — and lay everything out into your story.
      </p>

      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
        {tasks.map((t) => (
          <li
            key={t.label}
            className="flex items-center gap-3 rounded-2xl border border-cream-300/70 bg-cream-100 px-4 py-3 text-sm"
          >
            <t.icon className="h-4 w-4 shrink-0 text-lavender-500" />
            <span className="flex-1 text-ink-800">{t.label}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                t.pending
                  ? 'bg-butter-200 text-butter-500'
                  : 'bg-cream-200 text-ink-700/60'
              }`}
            >
              {t.pending ? 'Will write' : 'Already set'}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={run}
        disabled={done}
        className={`mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold shadow-card transition-all duration-300 ${
          done
            ? 'bg-butter-300 text-white'
            : 'bg-coral-500 text-white hover:-translate-y-1 hover:shadow-card-hover'
        }`}
      >
        {done ? (
          <>
            <Check className="h-5 w-5" strokeWidth={3} />
            Story Generated
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate My Story
          </>
        )}
      </button>
      {done && (
        <p className="mt-4 font-hand text-xl text-ink-700">
          Looking good — scroll down to read your story.
        </p>
      )}
    </div>
  );
}
