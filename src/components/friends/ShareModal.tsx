import { useMemo, useState } from 'react';
import { X, Users, Check, Globe, Lock, UserCheck, Eye, Heart, MessageCircle, BookHeart } from 'lucide-react';
import type { Story } from '@/types/story';
import { friends } from '@/data/friendsData';
import Avatar from '@/components/friends/Avatar';
import FullStoryView from '@/components/memories/FullStoryView';
import { accentBg, privacySubtitle } from '@/lib/storyDisplay';

interface ShareModalProps {
  stories: Story[];
  onShare: (storyId: string, privacy: 'friends' | 'selected', friendIds: string[]) => void;
  onClose: () => void;
}

export default function ShareModal({ stories, onShare, onClose }: ShareModalProps) {
  const shareable = useMemo(() => stories.filter((s) => s.photos.length > 0), [stories]);
  const [storyId, setStoryId] = useState(shareable[0]?.id ?? '');
  const [mode, setMode] = useState<'friends' | 'selected'>('friends');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [shared, setShared] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const story = shareable.find((s) => s.id === storyId) ?? shareable[0];
  const cover = story?.photos.find((p) => p.id === story.coverId) ?? story?.photos[0];

  const toggle = (id: string) => {
    setShared(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canShare = mode === 'friends' || selected.size > 0;

  const share = () => {
    if (!story || !canShare) return;
    onShare(story.id, mode, mode === 'friends' ? [] : Array.from(selected));
    setShared(true);
    window.setTimeout(onClose, 1600);
  };

  if (previewOpen && story) {
    return <FullStoryView story={story} onClose={() => setPreviewOpen(false)} />;
  }

  if (shareable.length === 0) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Share a story with friends"
      >
        <div
          className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-card-hover"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-butter-200 text-butter-500">
            <BookHeart className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">
            Nothing to share yet
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            Create and save a story first — it will show up here ready to pass along.
          </p>
          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-cream-200 px-6 py-3 text-sm font-bold text-ink-800 transition-colors hover:bg-cream-300"
          >
            Okay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share a story with friends"
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-200 hover:text-blush-500"
        >
          <X className="h-4 w-4" />
        </button>

        {shared ? (
          <div className="flex flex-col items-center py-12 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-butter-200 text-butter-500">
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900">
              Story shared!
            </h2>
            <p className="mt-2 font-hand text-xl text-ink-700">
              {mode === 'friends'
                ? 'All your friends'
                : `${selected.size} friend${selected.size === 1 ? '' : 's'}`}{' '}
              will find “{story?.title || 'Untitled story'}” on their feed.
            </p>
          </div>
        ) : (
          <>
            <div className="border-b border-cream-300/60 px-6 pb-4 pt-6 sm:px-8">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Share a story
              </h2>
              <p className="mt-1 text-sm text-ink-700">
                Pick one of your saved stories, then choose who gets to see it.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
                Your stories
              </p>
              <ul className="mt-2 space-y-2">
                {shareable.map((s) => {
                  const sCover = s.photos.find((p) => p.id === s.coverId) ?? s.photos[0];
                  const active = s.id === story?.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setStoryId(s.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors duration-300 ${
                          active
                            ? 'border-coral-300 bg-coral-100'
                            : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
                        }`}
                      >
                        {sCover ? (
                          <img src={sCover.dataUrl} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-200">
                            <BookHeart className="h-5 w-5 text-ink-700/30" />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-ink-900">
                            {s.title || 'Untitled story'}
                          </span>
                          <span className="block text-[11px] font-bold uppercase tracking-widest text-ink-700/50">
                            {s.photos.length} photo{s.photos.length === 1 ? '' : 's'} · {privacySubtitle(s)}
                          </span>
                        </span>
                        {active && <Check className="h-4 w-4 shrink-0 text-coral-500" strokeWidth={3} />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {story && (
                <div className={`mt-4 rounded-2xl p-4 ${accentBg[story.accent]}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
                      Preview before sharing
                    </p>
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 text-xs font-bold text-ink-800 shadow-card transition-colors hover:bg-lavender-200"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Open Full Story
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    {cover && (
                      <img src={cover.dataUrl} alt="" className="h-16 w-24 rounded-xl object-cover shadow-card" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-semibold text-ink-900">
                        {story.title || 'Untitled story'}
                      </p>
                      <p className="line-clamp-2 text-xs text-ink-700">{story.intro || 'No introduction yet.'}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-ink-700/60">
                        <Heart className="h-3 w-3" /> likes · <MessageCircle className="h-3 w-3" /> comments
                        update after sharing
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-ink-700/70">
                Share with
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('friends')}
                  aria-pressed={mode === 'friends'}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-left text-sm font-bold transition-colors duration-300 ${
                    mode === 'friends'
                      ? 'border-coral-300 bg-coral-100 text-ink-900'
                      : 'border-cream-300 bg-cream-100 text-ink-700 hover:bg-cream-200'
                  }`}
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  All friends
                </button>
                <button
                  onClick={() => setMode('selected')}
                  aria-pressed={mode === 'selected'}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-left text-sm font-bold transition-colors duration-300 ${
                    mode === 'selected'
                      ? 'border-coral-300 bg-coral-100 text-ink-900'
                      : 'border-cream-300 bg-cream-100 text-ink-700 hover:bg-cream-200'
                  }`}
                >
                  <UserCheck className="h-4 w-4 shrink-0" />
                  Pick friends
                </button>
              </div>

              {mode === 'selected' && (
                <ul className="mt-3 space-y-2">
                  {friends.map((f) => {
                    const active = selected.has(f.id);
                    return (
                      <li key={f.id}>
                        <button
                          onClick={() => toggle(f.id)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition-colors duration-300 ${
                            active
                              ? 'border-coral-300 bg-coral-100'
                              : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
                          }`}
                        >
                          <Avatar src={f.avatar} name={f.name} size="sm" accent={f.accent} />
                          <span className="flex-1 text-sm font-bold text-ink-900">{f.name}</span>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 ${
                              active
                                ? 'border-coral-500 bg-coral-500 text-white'
                                : 'border-cream-300 bg-cream-50'
                            }`}
                          >
                            {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-cream-300/60 px-6 py-5 sm:px-8">
              <button
                onClick={share}
                disabled={!canShare}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-500 px-6 py-3.5 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 hover:shadow-card-hover disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:hover:bg-coral-500"
              >
                <Users className="h-4 w-4" />
                {mode === 'friends'
                  ? 'Share with all friends'
                  : `Share with ${selected.size} friend${selected.size === 1 ? '' : 's'}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
