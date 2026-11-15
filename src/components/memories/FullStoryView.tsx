import { useMemo, useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Trash2,
  Pencil,
  Check,
  Users,
  Lock,
  Globe,
} from 'lucide-react';
import type { Story } from '@/types/story';
import type { StoryComment, StoryEngagement } from '@/lib/storyEngagement';
import {
  loadEngagement,
  toggleLike,
  addComment,
  editComment,
  deleteComment,
} from '@/lib/storyEngagement';
import Avatar from '@/components/friends/Avatar';
import { accentBg, fontClass, fontCaptionClass, privacySubtitle } from '@/lib/storyDisplay';

const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];

const privacyIcon: Record<Story['privacy'], typeof Globe> = {
  private: Lock,
  friends: Users,
  selected: Users,
};

interface FullStoryViewProps {
  story: Story;
  onClose: () => void;
}

export default function FullStoryView({ story, onClose }: FullStoryViewProps) {
  const [engagement, setEngagement] = useState<StoryEngagement>(() =>
    loadEngagement(story.id)
  );
  const [draft, setDraft] = useState('');
  const [replyTo, setReplyTo] = useState<StoryComment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');

  const topComments = useMemo(
    () => engagement.comments.filter((c) => !c.replyToId),
    [engagement.comments]
  );

  const PrivacyIcon = privacyIcon[story.privacy];

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    setEngagement(addComment(story.id, text, replyTo ?? undefined));
    setDraft('');
    setReplyTo(null);
  };

  const saveEdit = () => {
    const text = editDraft.trim();
    if (!text || !editingId) return;
    setEngagement(editComment(story.id, editingId, text));
    setEditingId(null);
    setEditDraft('');
  };

  const heading = fontClass[story.font];

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Full story: ${story.title}`}
    >
      <div
        className={`mx-auto my-6 max-w-3xl rounded-3xl shadow-card-hover sm:my-10 ${accentBg[story.accent]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink-900/10 bg-inherit px-5 py-4 backdrop-blur-md sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar src={undefined} name="You" size="sm" accent="lavender" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink-900">You</p>
              <time className="block text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
                {new Date(story.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close story"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-200 hover:text-blush-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <article className="px-5 py-8 sm:px-10 sm:py-12">
          {story.photos.length > 0 ? (
            <div
              className={
                story.layout === 'grid'
                  ? 'grid gap-6 sm:grid-cols-2'
                  : story.layout === 'collage'
                    ? 'grid grid-cols-2 gap-4 sm:gap-6'
                    : 'space-y-10'
              }
            >
              {story.photos.map((photo, i) => (
                <figure
                  key={photo.id}
                  className={story.layout === 'stacked' ? rotations[i % rotations.length] : ''}
                >
                  <img
                    src={photo.dataUrl}
                    alt={photo.caption || `Photo ${i + 1}`}
                    className="w-full rounded-2xl object-cover shadow-card"
                  />
                  {(photo.caption || photo.date || photo.location) && (
                    <figcaption className="mt-2.5 px-1">
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
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="paper-dots flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream-200/60">
              <p className={`${heading} text-2xl text-ink-700/50`}>no photos yet</p>
            </div>
          )}

          <header className="mt-10 text-center">
            <h1 className={`${heading} text-4xl font-medium leading-tight text-ink-900 sm:text-5xl`}>
              {story.title || 'Untitled story'}
            </h1>
            {story.intro && (
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-700">{story.intro}</p>
            )}
          </header>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-50/80 px-3 py-1">
              <PrivacyIcon className="h-3 w-3" />
              {privacySubtitle(story)}
            </span>
            <span className="rounded-full bg-cream-50/80 px-3 py-1">
              {new Date(story.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="rounded-full bg-cream-50/80 px-3 py-1 capitalize">
              {story.theme} theme
            </span>
          </div>

          <div className="mt-10 border-t border-ink-900/10 pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setEngagement(toggleLike(story.id))}
                aria-pressed={engagement.likedByMe}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-card transition-all duration-300 ${
                  engagement.likedByMe
                    ? 'bg-blush-200 text-blush-500'
                    : 'bg-cream-50 text-ink-700 hover:bg-blush-100 hover:text-blush-500'
                }`}
              >
                <Heart className="h-4 w-4" fill={engagement.likedByMe ? 'currentColor' : 'none'} />
                {engagement.likedByMe ? 'Liked' : 'Like'} ·{' '}
                {engagement.likedBy.length + (engagement.likedByMe ? 1 : 0)}
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-700/60">
                <MessageCircle className="h-4 w-4" />
                {engagement.comments.length} {engagement.comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </div>
            {engagement.likedBy.length > 0 && (
              <p className="mt-3 text-xs font-semibold text-ink-700">
                {engagement.likedBy.join(', ')}
                {engagement.likedByMe ? ' and you' : ''} liked this memory
              </p>
            )}
          </div>

          <section className="mt-8 border-t border-ink-900/10 pt-6" aria-label="Comments">
            {topComments.length > 0 ? (
              <ul className="space-y-4">
                {topComments.map((c) => {
                  const replies = engagement.comments.filter((r) => r.replyToId === c.id);
                  return (
                    <li key={c.id}>
                      <CommentRow
                        comment={c}
                        engagement={engagement}
                        onEdit={setEditingId}
                        editing={{ id: editingId, draft: editDraft, setDraft: setEditDraft, save: saveEdit }}
                        onDelete={(id) => setEngagement(deleteComment(story.id, id))}
                        onReply={() => setReplyTo(c)}
                      />
                      {replies.length > 0 && (
                        <ul className="ml-10 mt-3 space-y-3 border-l-2 border-lavender-200 pl-4">
                          {replies.map((r) => (
                            <li key={r.id}>
                              <CommentRow
                                comment={r}
                                engagement={engagement}
                                onEdit={setEditingId}
                                editing={{ id: editingId, draft: editDraft, setDraft: setEditDraft, save: saveEdit }}
                                onDelete={(id) => setEngagement(deleteComment(story.id, id))}
                                onReply={() => setReplyTo(r)}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-ink-700/70">
                No comments yet — leave the first kind note.
              </p>
            )}

            <div className="mt-6">
              {replyTo && (
                <p className="mb-2 flex items-center gap-2 text-xs font-bold text-lavender-500">
                  Replying to {replyTo.author}
                  <button
                    onClick={() => setReplyTo(null)}
                    aria-label="Cancel reply"
                    className="text-ink-700/50 hover:text-blush-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </p>
              )}
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  placeholder="Say something kind..."
                  aria-label="Write a comment"
                  className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-300/50"
                />
                <button
                  onClick={submit}
                  disabled={!draft.trim()}
                  aria-label="Send comment"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-500 text-white shadow-card transition-all hover:bg-ink-900 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

function CommentRow({
  comment,
  onEdit,
  editing,
  onDelete,
  onReply,
}: {
  comment: StoryComment;
  engagement: StoryEngagement;
  onEdit: (id: string) => void;
  editing: { id: string | null; draft: string; setDraft: (d: string) => void; save: () => void };
  onDelete: (id: string) => void;
  onReply: () => void;
}) {
  const mine = comment.author === 'You';
  const isEditing = editing.id === comment.id;

  return (
    <div className="flex gap-3">
      <Avatar src={undefined} name={comment.author} size="sm" accent="butter" />
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-cream-50/80 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-bold text-ink-900">{comment.author}</p>
          <time className="text-[10px] font-semibold text-ink-700/50">
            {new Date(comment.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {mine && !isEditing && (
            <span className="ml-auto flex items-center gap-0.5">
              <button
                onClick={() => {
                  onEdit(comment.id);
                  editing.setDraft(comment.text);
                }}
                aria-label="Edit your comment"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-lavender-200 hover:text-lavender-500"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                aria-label="Delete your comment"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-blush-200 hover:text-blush-500"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
        {isEditing ? (
          <div className="mt-2 flex items-center gap-2">
            <input
              value={editing.draft}
              onChange={(e) => editing.setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && editing.save()}
              className="min-w-0 flex-1 rounded-full border border-lavender-300 bg-cream-50 px-3 py-1.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-300/50"
            />
            <button
              onClick={editing.save}
              aria-label="Save edited comment"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender-500 text-white"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{comment.text}</p>
        )}
        {!isEditing && (
          <button
            onClick={onReply}
            className="mt-1.5 text-[11px] font-bold text-lavender-500 hover:text-ink-900"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
