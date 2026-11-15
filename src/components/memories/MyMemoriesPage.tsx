import { useMemo, useState } from 'react';
import { Plus, BookOpen, Trash2, Pencil, Eye, FileEdit } from 'lucide-react';
import type { Story } from '@/types/story';
import { deleteStory, saveStory } from '@/lib/storyStorage';
import { accentBg, privacySubtitle } from '@/lib/storyDisplay';
import FullStoryView from '@/components/memories/FullStoryView';

interface MyMemoriesPageProps {
  stories: Story[];
  onCreate: () => void;
  onEdit: (story: Story) => void;
  onRefresh: () => void;
}



function StoryShelfCard({
  story,
  onEdit,
  onDelete,
  onOpen,
}: {
  story: Story;
  onEdit: () => void;
  onDelete: () => void;
  onOpen: () => void;
}) {
  const cover = story.photos.find((p) => p.id === story.coverId) ?? story.photos[0];
  const isDraft = story.status === 'draft';

  return (
    <article
      className={`group relative flex flex-col rounded-3xl p-3 pb-5 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover ${accentBg[story.accent]} ${
        story.id.length % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'
      }`}
    >
      {isDraft && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-ink-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cream-50">
          Draft
        </span>
      )}
      <button
        onClick={onOpen}
        aria-label={`Open ${story.title || 'untitled story'}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl"
      >
        {cover ? (
          <img src={cover.dataUrl} alt={`Cover of ${story.title}`} className="h-full w-full object-cover" />
        ) : (
          <div className="paper-dots flex h-full w-full items-center justify-center bg-cream-200">
            <BookOpen className="h-10 w-10 text-ink-700/30" />
          </div>
        )}
      </button>
      <div className="flex-1 px-2 pt-4">
        <button onClick={onOpen} className="block w-full text-left">
          <h3 className="truncate font-display text-xl font-semibold text-ink-900 hover:text-coral-500">
            {story.title || 'Untitled story'}
          </h3>
        </button>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
          {story.photos.length} photo{story.photos.length === 1 ? '' : 's'} ·{' '}
          {new Date(story.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          · {privacySubtitle(story)}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onEdit}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-3 py-2 text-xs font-bold text-cream-50 transition-colors hover:bg-coral-500"
          >
            {isDraft ? <FileEdit className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {isDraft ? 'Continue' : 'Reopen'}
          </button>
          <button
            onClick={onEdit}
            aria-label={`Edit ${story.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-ink-700 shadow-card transition-colors hover:bg-lavender-200 hover:text-lavender-500"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${story.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-ink-700 shadow-card transition-colors hover:bg-blush-200 hover:text-blush-500"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MyMemoriesPage({
  stories,
  onCreate,
  onEdit,
  onRefresh,
}: MyMemoriesPageProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);

  const openStory = stories.find((s) => s.id === openStoryId) ?? null;

  const published = useMemo(() => stories.filter((s) => s.status === 'published'), [stories]);
  const drafts = useMemo(() => stories.filter((s) => s.status === 'draft'), [stories]);

  const handleDelete = (id: string) => {
    deleteStory(id);
    onRefresh();
    setConfirmDeleteId(null);
  };

  const handleReopen = (story: Story) => {
    saveStory({ ...story, updatedAt: new Date().toISOString() });
    onEdit(story);
  };

  const emptyShelf = (label: string, hint: string) => (
    <div className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-8 text-center">
      <BookOpen className="mx-auto h-8 w-8 text-ink-700/30" />
      <p className="mt-3 font-display text-lg font-semibold text-ink-900">{label}</p>
      <p className="mt-1 text-sm text-ink-700">{hint}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-babyblue-100/60 via-cream-50 to-pink-100/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="font-hand text-2xl text-coral-500">your own shelf</span>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            My Memories
          </h1>
          <p className="mt-3 max-w-md leading-relaxed text-ink-700">
            Every story you've made, kept safe on its own shelf.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-coral-500 px-6 py-3.5 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 hover:shadow-card-hover"
        >
          <Plus className="h-4 w-4" strokeWidth={3} />
          Create a Story
        </button>
      </header>

      <section aria-labelledby="published-heading" className="mt-12">
        <h2 id="published-heading" className="mb-6 font-display text-2xl font-semibold text-ink-900">
          Published stories
        </h2>
        {published.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((s) => (
              <StoryShelfCard
                key={s.id}
                story={s}
                onEdit={() => handleReopen(s)}
                onDelete={() => setConfirmDeleteId(s.id)}
                onOpen={() => setOpenStoryId(s.id)}
              />
            ))}
          </div>
        ) : (
          emptyShelf('Nothing published yet', 'Finish a story and it will live here.')
        )}
      </section>

      <section aria-labelledby="drafts-heading" className="mt-16">
        <h2 id="drafts-heading" className="mb-6 font-display text-2xl font-semibold text-ink-900">
          Drafts
        </h2>
        {drafts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((s) => (
              <StoryShelfCard
                key={s.id}
                story={s}
                onEdit={() => handleReopen(s)}
                onDelete={() => setConfirmDeleteId(s.id)}
                onOpen={() => setOpenStoryId(s.id)}
              />
            ))}
          </div>
        ) : (
          emptyShelf('No drafts', 'Half-finished stories will wait for you here.')
        )}
      </section>

      {openStory && (
        <FullStoryView story={openStory} onClose={() => setOpenStoryId(null)} />
      )}

      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
          onClick={() => setConfirmDeleteId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Delete story"
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-card-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush-200 text-blush-500">
              <Trash2 className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">
              Delete this story?
            </h2>
            <p className="mt-2 text-sm text-ink-700">
              This can't be undone — the photos and captions will be gone for good.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 rounded-full bg-cream-200 px-4 py-3 text-sm font-bold text-ink-800 transition-colors hover:bg-cream-300"
              >
                Keep It
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 rounded-full bg-blush-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-ink-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
