import { useMemo } from 'react';
import { X, BookHeart, Heart, MessageCircle } from 'lucide-react';
import type { Friend } from '@/data/friendsData';
import { friendStories, sharedMemories } from '@/data/friendsData';
import type { Story } from '@/types/story';
import Avatar from '@/components/friends/Avatar';

interface FriendProfileModalProps {
  friend: Friend;
  allStories: Story[];
  onOpenStory: (story: Story) => void;
  onClose: () => void;
}

export default function FriendProfileModal({
  friend,
  allStories,
  onOpenStory,
  onClose,
}: FriendProfileModalProps) {
  const sharedWithMe = useMemo(
    () =>
      allStories.filter(
        (s) =>
          s.status === 'published' &&
          (s.privacy === 'friends' ||
            (s.privacy === 'selected' && s.selectedFriendIds.includes(friend.id)))
      ),
    [allStories, friend.id]
  );

  const storiesFromFeed = useMemo(
    () => friendStories.filter((s) => s.friendId === friend.id),
    [friend.id]
  );

  const memoryCount = useMemo(
    () => sharedMemories.filter((m) => m.friendId === friend.id).length,
    [friend.id]
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${friend.name}'s profile`}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center gap-4 bg-gradient-to-r from-lavender-100 to-pink-100 px-6 py-6 sm:px-8">
          <Avatar src={friend.avatar} name={friend.name} size="lg" accent={friend.accent} />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{friend.name}</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-700/60">
              {friend.mutualNote}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-200 hover:text-blush-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-4 py-1.5 text-xs font-bold text-mint-500">
              <BookHeart className="h-3.5 w-3.5" />
              {storiesFromFeed.length} shared stories
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-babyblue-100 px-4 py-1.5 text-xs font-bold text-babyblue-500">
              <Heart className="h-3.5 w-3.5" />
              {memoryCount} shared memories
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-butter-200 px-4 py-1.5 text-xs font-bold text-butter-500">
              {sharedWithMe.length} of your stories
            </span>
          </div>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-ink-700/70">
            Stories you've shared with {friend.name}
          </h3>
          {sharedWithMe.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {sharedWithMe.map((s) => {
                const cover = s.photos.find((p) => p.id === s.coverId) ?? s.photos[0];
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => onOpenStory(s)}
                      className="flex w-full items-center gap-4 rounded-2xl border border-cream-300/70 bg-cream-100 p-3 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                    >
                      {cover ? (
                        <img src={cover.dataUrl} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                      ) : (
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-ink-700/30">
                          <BookHeart className="h-5 w-5" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-semibold text-ink-900">
                          {s.title || 'Untitled story'}
                        </span>
                        <span className="block text-[11px] font-bold uppercase tracking-widest text-ink-700/50">
                          {s.photos.length} photos · {new Date(s.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 rounded-2xl border border-dashed border-cream-300 bg-cream-100 p-5 text-sm text-ink-700">
              {friend.name} hasn't opened any of your shared stories yet. Share one from below!
            </p>
          )}

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-ink-700/70">
            On their shelf
          </h3>
          {storiesFromFeed.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {storiesFromFeed.map((s) => {
                const likes = 12 + s.id.length * 3;
                return (
                  <li key={s.id} className="flex items-center gap-4 rounded-2xl border border-cream-300/70 bg-cream-100 p-3 shadow-card">
                    <img src={s.cover} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base font-semibold text-ink-900">{s.title}</p>
                      <p className="truncate text-xs text-ink-700">{s.caption}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1 text-[11px] font-bold text-ink-700/60">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" fill="currentColor" /> {likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {s.pages.length} pages
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 rounded-2xl border border-dashed border-cream-300 bg-cream-100 p-5 text-sm text-ink-700">
              {friend.name} hasn't shared anything from their own shelf yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
