import { X, Heart, MessageCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useState } from 'react';
import type { FriendStory, FriendComment } from '@/data/friendsData';
import Avatar from '@/components/friends/Avatar';

interface StoryViewerProps {
  story: FriendStory;
  authorName: string;
  authorAvatar: string;
  liked: boolean;
  likeCount: number;
  comments: FriendComment[];
  onClose: () => void;
  onToggleLike: () => void;
  onAddComment: (text: string) => void;
}

export default function StoryViewer({
  story,
  authorName,
  authorAvatar,
  liked,
  likeCount,
  comments,
  onClose,
  onToggleLike,
  onAddComment,
}: StoryViewerProps) {
  const [page, setPage] = useState(0);
  const [draft, setDraft] = useState('');
  const current = story.pages[page];

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onAddComment(text);
    setDraft('');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${story.title}`}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card-hover sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close story"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-ink-800 shadow-card transition-colors hover:bg-blush-200 hover:text-blush-500"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex-1 bg-ink-900 sm:min-h-[480px]">
          <img
            src={current.image}
            alt={current.alt}
            className="h-56 w-full object-cover sm:h-full"
          />
          {story.pages.length > 1 && (
            <>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous page"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 shadow-card transition-all hover:bg-coral-500 hover:text-white disabled:opacity-30 disabled:hover:bg-cream-50/90 disabled:hover:text-ink-900"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(story.pages.length - 1, p + 1))}
                disabled={page === story.pages.length - 1}
                aria-label="Next page"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 shadow-card transition-all hover:bg-coral-500 hover:text-white disabled:opacity-30 disabled:hover:bg-cream-50/90 disabled:hover:text-ink-900"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {story.pages.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === page ? 'w-6 bg-coral-300' : 'w-1.5 bg-cream-50/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col sm:w-80 sm:shrink-0">
          <div className="flex items-center gap-3 border-b border-cream-300/60 p-5 pb-4">
            <Avatar src={authorAvatar} name={authorName} size="md" accent={story.accent} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ink-700/60">
                A story by
              </p>
              <p className="font-display text-lg font-semibold text-ink-900">
                {authorName}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <h2 className="font-display text-2xl font-semibold leading-tight text-ink-900">
              {story.title}
            </h2>
            <time className="mt-1 block text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
              {story.date}
            </time>
            <p className="mt-3 font-hand text-lg leading-snug text-ink-700">
              {current.note}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={onToggleLike}
                aria-pressed={liked}
                aria-label={liked ? 'Unlike this story' : 'Like this story'}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  liked
                    ? 'bg-blush-200 text-blush-500'
                    : 'bg-cream-200 text-ink-700 hover:bg-blush-100 hover:text-blush-500'
                }`}
              >
                <Heart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} />
                {likeCount}
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-700/60">
                <MessageCircle className="h-4 w-4" />
                {comments.length} comments
              </span>
            </div>

            <ul className="mt-5 space-y-4">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <Avatar src={c.avatar} name={c.author} size="sm" />
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-cream-200/70 px-4 py-3">
                    <p className="text-xs font-bold text-ink-900">
                      {c.author}
                      <span className="ml-2 font-semibold text-ink-700/50">
                        {c.date}
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      {c.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-cream-300/60 p-4">
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="Leave a little note..."
                className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-100 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50"
              />
              <button
                onClick={submit}
                disabled={!draft.trim()}
                aria-label="Send comment"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-500 text-white shadow-card transition-all hover:bg-ink-900 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
