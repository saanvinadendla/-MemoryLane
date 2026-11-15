import { useEffect, useMemo, useState } from 'react';
import { UserPlus, Search, BookHeart, Heart, UserRoundPlus, Check, Globe } from 'lucide-react';
import type { Story } from '@/types/story';
import { loadStories } from '@/lib/storyStorage';
import { privacySubtitle } from '@/lib/storyDisplay';
import FullStoryView from '@/components/memories/FullStoryView';
import {
  friends,
  friendStories,
  sharedMemories,
  initialComments,
} from '@/data/friendsData';
import type { FriendComment } from '@/data/friendsData';
import FriendCard from '@/components/friends/FriendCard';
import FriendStoryCard from '@/components/friends/FriendStoryCard';
import StoryViewer from '@/components/friends/StoryViewer';
import ShareModal from '@/components/friends/ShareModal';
import FriendProfileModal from '@/components/friends/FriendProfileModal';
import Avatar from '@/components/friends/Avatar';
import { saveStory } from '@/lib/storyStorage';

export default function FriendsPage() {
  const [query, setQuery] = useState('');
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] =
    useState<Record<string, FriendComment[]>>(initialComments);
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);
  const [openOwnStoryId, setOpenOwnStoryId] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [profileFriendId, setProfileFriendId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invited, setInvited] = useState<string[]>([]);
  const [myStories, setMyStories] = useState<Story[]>([]);

  useEffect(() => {
    setMyStories(loadStories());
  }, []);

  const sharedByMe = useMemo(
    () =>
      myStories.filter(
        (s) =>
          s.status === 'published' &&
          (s.privacy === 'friends' ||
            (s.privacy === 'selected' && s.selectedFriendIds.length > 0))
      ),
    [myStories]
  );

  const sendInvite = () => {
    const email = inviteEmail.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email) || invited.includes(email)) return;
    setInvited((prev) => [...prev, email]);
    setInviteEmail('');
  };

  const friendById = useMemo(
    () => Object.fromEntries(friends.map((f) => [f.id, f])),
    []
  );

  const filteredFriends = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) => f.name.toLowerCase().includes(q));
  }, [query]);

  const openStory = openStoryId
    ? friendStories.find((s) => s.id === openStoryId)
    : null;

  const openOwnStory = openOwnStoryId
    ? myStories.find((s) => s.id === openOwnStoryId) ?? null
    : null;

  const profileFriend = profileFriendId
    ? friends.find((f) => f.id === profileFriendId) ?? null
    : null;

  const handleShare = (storyId: string, privacy: 'friends' | 'selected', friendIds: string[]) => {
    const target = myStories.find((s) => s.id === storyId);
    if (!target) return;
    saveStory({
      ...target,
      privacy,
      selectedFriendIds: friendIds,
      updatedAt: new Date().toISOString(),
    });
    setMyStories(loadStories());
  };

  const totalLikes = (storyId: string) =>
    ({ 'sierra-hike': 18, 'sourdough-week': 24, 'garden-days': 11, 'vinyl-nights': 15 })[
      storyId
    ] ?? 0;

  const likeCount = (storyId: string) =>
    totalLikes(storyId) + (likes[storyId] ? 1 : 0);

  return (
    <div className="bg-gradient-to-b from-mint-100/50 via-cream-50 to-babyblue-100/60">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="font-hand text-2xl text-coral-500">
            their shelves, your shelf
          </span>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Friends
          </h1>
          <p className="mt-3 max-w-md leading-relaxed text-ink-700">
            Peek into the scrapbooks your friends are keeping — and leave a
            little note while you're there.
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('invite-email-input');
            el?.focus();
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-coral-500 px-6 py-3.5 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 hover:shadow-card-hover"
        >
          <UserPlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Add Friends
        </button>
      </header>

      <section
        aria-labelledby="add-friends-heading"
        className="mb-14 rounded-3xl border border-cream-300/70 bg-lavender-100/60 paper-dots p-6 sm:p-8"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lavender-200 text-lavender-500 shadow-card sm:flex">
            <UserRoundPlus className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <h2
              id="add-friends-heading"
              className="font-display text-xl font-semibold text-ink-900"
            >
              Add friends by email
            </h2>
            <p className="mt-1 text-sm text-ink-700">
              They'll get an invitation to open their own scrapbook shelf.
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <input
              id="invite-email-input"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendInvite()}
              placeholder="friend@example.com"
              aria-label="Friend's email address"
              className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50 sm:w-64"
            />
            <button
              onClick={sendInvite}
              disabled={!/^\S+@\S+\.\S+$/.test(inviteEmail)}
              className="shrink-0 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 transition-colors duration-300 hover:bg-coral-500 disabled:opacity-40"
            >
              Send Invite
            </button>
          </div>
        </div>
        {invited.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-live="polite">
            {invited.map((email) => (
              <li
                key={email}
                className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-1.5 text-xs font-bold text-ink-700 shadow-card"
              >
                <Check className="h-3.5 w-3.5 text-butter-500" strokeWidth={3} />
                {email}
                <span className="font-semibold uppercase tracking-wider text-butter-500">
                  invited
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="friends-stories-heading" className="mb-16">
        <h2
          id="friends-stories-heading"
          className="mb-6 font-display text-2xl font-semibold text-ink-900"
        >
          Stories shared with you
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {friendStories.map((story) => {
            const author = friendById[story.friendId];
            return (
              <FriendStoryCard
                key={story.id}
                story={story}
                authorName={author.name}
                authorAvatar={author.avatar}
                liked={!!likes[story.id]}
                likeCount={likeCount(story.id)}
                commentCount={(comments[story.id] ?? []).length}
                onOpen={() => setOpenStoryId(story.id)}
                onToggleLike={() =>
                  setLikes((prev) => ({ ...prev, [story.id]: !prev[story.id] }))
                }
                onComment={() => setOpenStoryId(story.id)}
              />
            );
          })}
        </div>
        {friendStories.length === 0 && (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-8 text-center text-ink-700">
            No one has shared a story with you yet. Once a friend publishes one,
            it'll show up here.
          </p>
        )}
      </section>

      <section aria-labelledby="shared-by-me-heading" className="mb-16">
        <h2
          id="shared-by-me-heading"
          className="mb-2 font-display text-2xl font-semibold text-ink-900"
        >
          Shared by you
        </h2>
        <p className="mb-6 text-sm text-ink-700">
          Stories from your own shelf that your friends can now see.
        </p>
        {sharedByMe.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sharedByMe.map((s) => {
              const cover = s.photos.find((p) => p.id === s.coverId) ?? s.photos[0];
              return (
                <button
                  key={s.id}
                  onClick={() => setOpenOwnStoryId(s.id)}
                  aria-label={`Open ${s.title || 'untitled story'}`}
                  className="group rounded-3xl bg-cream-100 p-3 pb-4 text-left shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    {cover ? (
                      <img
                        src={cover.dataUrl}
                        alt={`Cover of ${s.title}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="paper-dots flex h-full w-full items-center justify-center bg-cream-200">
                        <BookHeart className="h-8 w-8 text-ink-700/30" />
                      </div>
                    )}
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-butter-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      <Globe className="h-3 w-3" />
                      Shared
                    </span>
                  </div>
                  <div className="px-2 pt-3">
                    <h3 className="truncate font-display text-lg font-semibold text-ink-900">
                      {s.title || 'Untitled story'}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
                      {s.photos.length} photo{s.photos.length === 1 ? '' : 's'} ·{' '}
                      {new Date(s.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
                      {privacySubtitle(s)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-8 text-center text-ink-700">
            You haven't shared a story with friends yet. Publish one and choose
            "Friends" or "Selected friends" to see it here.
          </p>
        )}
      </section>

      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-10">
        <section aria-labelledby="friends-list-heading">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2
              id="friends-list-heading"
              className="font-display text-2xl font-semibold text-ink-900"
            >
              Your people
            </h2>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a friend..."
                aria-label="Search friends"
                className="w-44 rounded-full border border-cream-300 bg-cream-100 py-2.5 pl-10 pr-4 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50 sm:w-52"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((f) => (
                <FriendCard
                  key={f.id}
                  name={f.name}
                  avatar={f.avatar}
                  accent={f.accent}
                  note={f.mutualNote}
                  onView={() => setProfileFriendId(f.id)}
                />
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-100 p-6 text-center text-sm text-ink-700">
                No friends match “{query}” — yet.
              </p>
            )}
          </div>
        </section>

        <section aria-labelledby="shared-memories-heading">
          <h2
            id="shared-memories-heading"
            className="mb-6 font-display text-2xl font-semibold text-ink-900"
          >
            Shared between you
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sharedMemories.map((m, i) => {
              const friend = friendById[m.friendId];
              return (
                <figure
                  key={m.id}
                  className={`group relative overflow-hidden rounded-3xl bg-cream-100 p-3 pb-4 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover ${
                    i % 2 === 0 ? 'sm:-rotate-[1.2deg] sm:hover:rotate-0' : 'sm:rotate-[1.2deg] sm:hover:rotate-0'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={m.photo}
                      alt={m.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-2 pt-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={friend.avatar}
                        name={friend.name}
                        size="sm"
                        accent={friend.accent}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-ink-900">
                          with {friend.name}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-ink-700/50">
                          {m.date}
                        </p>
                      </div>
                      <Heart className="ml-auto h-3.5 w-3.5 text-blush-500" fill="currentColor" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {m.caption}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-16 rounded-3xl border border-cream-300/70 bg-butter-100 paper-dots p-8 text-center sm:p-12">
        <BookHeart className="mx-auto h-10 w-10 text-butter-500" />
        <h2 className="mt-4 font-display text-3xl font-medium text-ink-900">
          Share one of yours
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-700">
          A story isn't finished until the people in it have seen it. Pass one
          along.
        </p>
        <button
          onClick={() => setIsShareOpen(true)}
          className="mt-6 rounded-full bg-ink-900 px-8 py-3.5 text-sm font-bold text-cream-50 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-500 hover:shadow-card-hover"
        >
          Share a Story with Friends
        </button>
      </section>

      {openStory && (
        <StoryViewer
          story={openStory}
          authorName={friendById[openStory.friendId].name}
          authorAvatar={friendById[openStory.friendId].avatar}
          liked={!!likes[openStory.id]}
          likeCount={likeCount(openStory.id)}
          comments={comments[openStory.id] ?? []}
          onClose={() => setOpenStoryId(null)}
          onToggleLike={() =>
            setLikes((prev) => ({ ...prev, [openStory.id]: !prev[openStory.id] }))
          }
          onAddComment={(text) =>
            setComments((prev) => ({
              ...prev,
              [openStory.id]: [
                ...(prev[openStory.id] ?? []),
                {
                  id: `c-${Date.now()}`,
                  author: 'You',
                  avatar:
                    'https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
                  text,
                  date: 'Just now',
                },
              ],
            }))
          }
        />
      )}

      {isShareOpen && (
        <ShareModal
          stories={myStories}
          onShare={handleShare}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      {profileFriend && (
        <FriendProfileModal
          friend={profileFriend}
          allStories={myStories}
          onOpenStory={(s) => {
            setProfileFriendId(null);
            setOpenOwnStoryId(s.id);
          }}
          onClose={() => setProfileFriendId(null)}
        />
      )}

      {openOwnStory && (
        <FullStoryView story={openOwnStory} onClose={() => setOpenOwnStoryId(null)} />
      )}
      </div>
    </div>
  );
}
