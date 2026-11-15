import { X, Pencil } from 'lucide-react';
import type { Story } from '@/types/story';
import { accentBg, fontClass, fontCaptionClass } from '@/lib/storyDisplay';

const rotations = ['-rotate-2', 'rotate-1.5', '-rotate-1', 'rotate-2', '-rotate-1.5', 'rotate-1'];
const tapes = ['bg-lavender-300/80', 'bg-blush-300/80', 'bg-coral-300/80', 'bg-butter-300/80'];

export default function StoryPreview({ story, onClose }: { story: Story; onClose: () => void }) {
  const cover = story.photos.find((p) => p.id === story.coverId) ?? story.photos[0];
  const rest = story.photos.filter((p) => p.id !== cover?.id);
  const heading = fontClass[story.font];

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${story.title}`}
    >
      <div
        className={`mx-auto my-6 max-w-3xl rounded-3xl shadow-card-hover sm:my-10 ${accentBg[story.accent]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-900/10 bg-inherit px-5 py-4 backdrop-blur-md sm:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-ink-700/60">
            Preview — not published yet
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 text-xs font-bold text-ink-800 shadow-card transition-colors hover:bg-lavender-200"
            >
              <Pencil className="h-3.5 w-3.5" />
              Keep Editing
            </button>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-ink-800 shadow-card transition-colors hover:bg-blush-200 hover:text-blush-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="paper-dots px-5 py-10 sm:px-10 sm:py-14">
          {cover && (
            <figure
              className={`relative mx-auto max-w-xl transition-transform duration-700 ${rotations[0]}`}
            >
              <span aria-hidden className={`absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-sm shadow-sm ${tapes[0]}`} />
              <img
                src={cover.dataUrl}
                alt={cover.caption || 'Story cover'}
                className="w-full rounded-2xl object-cover shadow-card"
              />
            </figure>
          )}

          <header className="mt-10 text-center">
            <h1 className={`${heading} text-4xl font-medium leading-tight text-ink-900 sm:text-5xl`}>
              {story.title}
            </h1>
            {story.intro && (
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-700">
                {story.intro}
              </p>
            )}
          </header>

          <div
            className={`mt-12 ${
              story.layout === 'grid'
                ? 'grid gap-8 sm:grid-cols-2'
                : story.layout === 'collage'
                  ? 'grid grid-cols-2 gap-4 sm:gap-6'
                  : 'mx-auto max-w-xl space-y-12'
            }`}
          >
            {rest.map((photo, i) => {
              const rotation = rotations[i % rotations.length];
              const tape = tapes[i % tapes.length];
              return (
                <figure
                  key={photo.id}
                  className={`relative transition-transform duration-700 ${
                    story.layout === 'collage'
                      ? `${rotation} ${i % 3 === 0 ? 'mt-6' : ''}`
                      : story.layout === 'stacked'
                        ? rotation
                        : ''
                  }`}
                >
                  <span aria-hidden className={`absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-sm shadow-sm ${tape}`} />
                  <img
                    src={photo.dataUrl}
                    alt={photo.caption || `Photo ${i + 2}`}
                    className={`w-full rounded-2xl object-cover shadow-card ${
                      story.layout === 'grid' ? 'aspect-[4/3]' : 'aspect-[4/5] sm:aspect-[4/3]'
                    }`}
                  />
                  <figcaption className="mt-3 px-1">
                    {photo.caption && (
                      <p className={`${fontCaptionClass[story.font]} leading-snug text-ink-800`}>
                        {photo.caption}
                      </p>
                    )}
                    {(photo.date || photo.location) && (
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
                        {[photo.date, photo.location].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <p className={`mt-14 text-center text-2xl text-ink-700/70 ${fontClass[story.font]}`}>
            the end, for now
          </p>
        </div>
      </div>
    </div>
  );
}
