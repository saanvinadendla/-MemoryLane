import { Heart, MessageCircle, BookOpen } from 'lucide-react';
import type { FriendStory } from '@/data/friendsData';
import Avatar from '@/components/friends/Avatar';

const accentStyles = {
  lavender: { card: 'bg-lavender-100', tag: 'bg-lavender-200 text-lavender-500', tape: 'bg-lavender-300/80' },
  blush: { card: 'bg-blush-100', tag: 'bg-blush-200 text-blush-500', tape: 'bg-blush-300/80' },
  coral: { card: 'bg-coral-100', tag: 'bg-coral-200 text-coral-500', tape: 'bg-coral-300/80' },
  butter: { card: 'bg-butter-100', tag: 'bg-butter-200 text-butter-500', tape: 'bg-butter-300/80' },
} as const;

interface FriendStoryCardProps {
  story: FriendStory;
  authorName: string;
  authorAvatar: string;
  liked: boolean;
  likeCount: number;
  commentCount: number;
  onOpen: () => void;
  onToggleLike: () => void;
  onComment: () => void;
}

export default function FriendStoryCard({
  story,
  authorName,
  authorAvatar,
  liked,
  likeCount,
  commentCount,
  onOpen,
  onToggleLike,
  onComment,
}: FriendStoryCardProps) {
  const accent = accentStyles[story.accent];

  return (
    <article
      className={`group relative flex h-full flex-col rounded-3xl p-3 pb-5 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover ${accent.card} ${
        story.id === 'vinyl-nights' || story.id === 'sourdough-week'
          ? 'sm:rotate-[1.5deg] sm:hover:rotate-0'
          : 'sm:-rotate-[1.5deg] sm:hover:rotate-0'
      }`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open story: ${story.title} by ${authorName}`}
    >
      <div
        aria-hidden
        className={`absolute -top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-sm opacity-90 shadow-sm ${accent.tape}`}
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={story.cover}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${accent.tag}`}
        >
          {story.tag}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-3 py-1.5 text-xs font-bold text-cream-50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <BookOpen className="h-3.5 w-3.5" />
          View Story
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={authorAvatar}
            name={authorName}
            size="sm"
            accent={story.accent}
          />
          <div>
            <p className="text-sm font-bold text-ink-900">{authorName}</p>
            <time className="text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
              {story.date}
            </time>
          </div>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink-900">
          {story.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-700">
          {story.caption}
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-ink-900/10 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            aria-pressed={liked}
            aria-label={liked ? 'Unlike this story' : 'Like this story'}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              liked
                ? 'bg-blush-200 text-blush-500'
                : 'bg-white/70 text-ink-700 hover:bg-blush-100 hover:text-blush-500'
            }`}
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={liked ? 'currentColor' : 'none'}
            />
            {likeCount}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment();
            }}
            aria-label="View comments"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-ink-700 transition-all duration-300 hover:bg-lavender-100 hover:text-lavender-500"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {commentCount}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="ml-auto rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-cream-50 transition-colors duration-300 hover:bg-coral-500"
          >
            View Story
          </button>
        </div>
      </div>
    </article>
  );
}
