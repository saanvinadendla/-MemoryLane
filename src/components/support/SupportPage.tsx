import { useEffect, useState } from 'react';
import {
  HeartHandshake,
  Plus,
  X,
  Shield,
  Flag,
  Trash2,
  Heart,
  Bookmark,
  Send,
  Check,
} from 'lucide-react';
import type { SupportCategory, SupportPost } from '@/lib/supportStorage';
import {
  addComment,
  addPost,
  loadPosts,
  removePost,
  supportCategories,
  timeAgo,
  toggleCommentHeart,
  toggleCommentSave,
  toggleHug,
} from '@/lib/supportStorage';

const categoryTone: Record<SupportCategory, string> = {
  'Need Advice': 'bg-lavender-200 text-lavender-500',
  'Rough Day': 'bg-blush-200 text-blush-500',
  'Feeling Overwhelmed': 'bg-butter-200 text-butter-500',
  'Just Need to Vent': 'bg-coral-200 text-coral-500',
};

export default function SupportPage() {
  const [posts, setPosts] = useState<SupportPost[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<SupportCategory>('Rough Day');
  const [anonymous, setAnonymous] = useState(false);
  const [reported, setReported] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const submitPost = () => {
    if (!title.trim() || !body.trim()) return;
    setPosts(addPost({ title: title.trim(), body: body.trim(), category, anonymous }));
    setTitle('');
    setBody('');
    setAnonymous(false);
    setComposerOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-lavender-100/60 via-cream-50 to-pink-100/50">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-lavender-200 text-lavender-500 shadow-card">
          <HeartHandshake className="h-7 w-7" strokeWidth={2.2} />
        </span>
        <span className="mt-4 block font-hand text-2xl text-lavender-500">
          a soft place to land
        </span>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
          A Little Support
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          Share a hard moment, or sit with someone in theirs. Kind words only —
          this is a peer-support space, not professional therapy or medical care.
        </p>
      </header>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-butter-300/60 bg-butter-100 px-5 py-4 text-sm text-ink-800">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-butter-500" />
        <p className="leading-relaxed">
          Please keep this space gentle — no judgment, harassment, or dismissive
          comments. If you're in immediate danger or crisis, please contact your
          local emergency services or a crisis support line right away.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setComposerOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900"
        >
          {composerOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" strokeWidth={3} />}
          {composerOpen ? 'Close' : 'Share how you feel'}
        </button>
      </div>

      {composerOpen && (
        <div className="mt-6 rounded-3xl border border-lavender-300/50 bg-lavender-100/70 p-6 paper-dots sm:p-8">
          <label htmlFor="support-title" className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
            What's on your mind?
          </label>
          <input
            id="support-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give it a gentle title..."
            className="mt-2 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 font-display text-xl font-semibold text-ink-900 placeholder:font-body placeholder:text-base placeholder:font-normal placeholder:text-ink-700/40 focus:border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-300/50"
          />
          <label htmlFor="support-body" className="mt-5 block text-xs font-bold uppercase tracking-widest text-ink-700/70">
            Tell us more
          </label>
          <textarea
            id="support-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="Whatever you need to say — this is a safe corner for it."
            className="mt-2 w-full resize-none rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-800 placeholder:text-ink-700/40 focus:border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-300/50"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {supportCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors duration-300 ${
                  category === c
                    ? 'border-lavender-300 bg-lavender-200 text-lavender-500'
                    : 'border-cream-300 bg-cream-50 text-ink-700 hover:bg-cream-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink-800">
              <span
                onClick={() => setAnonymous((v) => !v)}
                role="checkbox"
                aria-checked={anonymous}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setAnonymous((v) => !v)}
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                  anonymous ? 'border-lavender-500 bg-lavender-500 text-white' : 'border-cream-300 bg-cream-50'
                }`}
              >
                {anonymous && <Check className="h-3 w-3" strokeWidth={3.5} />}
              </span>
              Post anonymously
            </label>
            <button
              onClick={submitPost}
              disabled={!title.trim() || !body.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-3 text-sm font-bold text-cream-50 transition-colors duration-300 hover:bg-coral-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              Share with the Community
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <SupportPostCard
            key={post.id}
            post={post}
            onHug={() => setPosts(toggleHug(post.id))}
            onComment={(text) => setPosts(addComment(post.id, text))}
            onHeartComment={(cid) => setPosts(toggleCommentHeart(post.id, cid))}
            onSaveComment={(cid) => setPosts(toggleCommentSave(post.id, cid))}
            onReport={() => {
              setReported(post.id);
              window.setTimeout(() => setReported(null), 3000);
            }}
            onDelete={() => setConfirmDeleteId(post.id)}
          />
        ))}
        {posts.length === 0 && (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-10 text-center text-ink-700">
            Nothing here yet. The first kind word could start the whole room.
          </p>
        )}
      </div>

      {reported && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-cream-50 shadow-card"
        >
          Thank you — our care team will take a look.
        </div>
      )}

      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
          onClick={() => setConfirmDeleteId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Delete post"
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-card-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush-200 text-blush-500">
              <Trash2 className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">
              Delete this post?
            </h2>
            <p className="mt-2 text-sm text-ink-700">
              It and all of its replies will be removed for good.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 rounded-full bg-cream-200 px-4 py-3 text-sm font-bold text-ink-800 transition-colors hover:bg-cream-300"
              >
                Keep It
              </button>
              <button
                onClick={() => {
                  setPosts(removePost(confirmDeleteId));
                  setConfirmDeleteId(null);
                }}
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

function SupportPostCard({
  post,
  onHug,
  onComment,
  onHeartComment,
  onSaveComment,
  onReport,
  onDelete,
}: {
  post: SupportPost;
  onHug: () => void;
  onComment: (text: string) => void;
  onHeartComment: (commentId: string) => void;
  onSaveComment: (commentId: string) => void;
  onReport: () => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState('');
  const mine = post.author === 'You';

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onComment(text);
    setDraft('');
  };

  return (
    <article className="rounded-3xl border border-cream-300/70 bg-cream-100 p-6 shadow-card transition-all duration-300 hover:shadow-card-hover sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider ${categoryTone[post.category]}`}>
          {post.category}
        </span>
        <time className="text-[11px] font-bold uppercase tracking-widest text-ink-700/50">
          {timeAgo(post.createdAt)}
        </time>
        <span className="ml-auto flex items-center gap-1">
          {!mine && (
            <button
              onClick={onReport}
              aria-label="Report this post"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-blush-200 hover:text-blush-500"
            >
              <Flag className="h-3.5 w-3.5" />
            </button>
          )}
          {mine && (
            <button
              onClick={onDelete}
              aria-label="Delete this post"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-blush-200 hover:text-blush-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </span>
      </div>

      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink-900">
        {post.title}
      </h2>
      <p className="mt-1 text-xs font-bold text-ink-700/60">
        {post.author} · shared with the community
      </p>
      <p className="mt-3 leading-relaxed text-ink-800">{post.body}</p>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onHug}
          aria-pressed={post.huggedByMe}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
            post.huggedByMe
              ? 'bg-lavender-200 text-lavender-500'
              : 'bg-cream-200 text-ink-700 hover:bg-lavender-100 hover:text-lavender-500'
          }`}
        >
          <HeartHandshake className="h-4 w-4" />
          {post.huggedByMe ? 'I’m here for you' : 'Send Support'} · {post.hugs}
        </button>
        <span className="text-xs font-bold text-ink-700/50">
          {post.comments.length} {post.comments.length === 1 ? 'reply' : 'replies'}
        </span>
      </div>

      {post.comments.length > 0 && (
        <ul className="mt-5 space-y-3 border-t border-cream-300/60 pt-5">
          {post.comments.map((c) => (
            <li key={c.id} className="rounded-2xl rounded-tl-sm bg-cream-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-ink-900">
                  {c.author}
                  <span className="ml-2 font-semibold text-ink-700/50">
                    {timeAgo(c.createdAt)}
                  </span>
                </p>
                <span className="ml-auto flex items-center gap-1">
                  <button
                    onClick={() => onHeartComment(c.id)}
                    aria-pressed={c.heartedByMe}
                    aria-label={c.heartedByMe ? 'Remove heart from this reply' : 'Send a heart for this reply'}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      c.heartedByMe ? 'text-blush-500' : 'text-ink-700/40 hover:text-blush-500'
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5" fill={c.heartedByMe ? 'currentColor' : 'none'} />
                  </button>
                  {c.hearts > 0 && <span className="text-[11px] font-bold text-ink-700/60">{c.hearts}</span>}
                  <button
                    onClick={() => onSaveComment(c.id)}
                    aria-pressed={c.savedByMe}
                    aria-label={c.savedByMe ? 'Remove this reply from saved' : 'Save this reply'}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      c.savedByMe ? 'text-butter-500' : 'text-ink-700/40 hover:text-butter-500'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={c.savedByMe ? 'currentColor' : 'none'} />
                  </button>
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-cream-300/60 pt-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Say something kind..."
          className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-300/50"
        />
        <button
          onClick={submit}
          disabled={!draft.trim()}
          aria-label="Send your reply"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-500 text-white shadow-card transition-all hover:bg-ink-900 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
