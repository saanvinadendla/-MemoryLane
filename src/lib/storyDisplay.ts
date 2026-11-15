import type { Story } from '@/types/story';
import { friends } from '@/data/friendsData';

export const fontClass: Record<Story['font'], string> = {
  serif: 'font-display',
  hand: 'font-hand',
  sans: 'font-body font-bold',
};

export const fontCaptionClass: Record<Story['font'], string> = {
  serif: 'text-sm font-semibold',
  hand: 'font-hand text-xl',
  sans: 'text-sm font-bold tracking-wide',
};

export const accentBg: Record<Story['accent'], string> = {
  cream: 'bg-cream-100',
  lavender: 'bg-lavender-100',
  blush: 'bg-blush-100',
  coral: 'bg-coral-100',
  butter: 'bg-butter-100',
};

export function privacySubtitle(story: Story): string {
  if (story.privacy === 'private') {
    return 'ONLY VISIBLE TO YOU';
  }
  if (story.privacy === 'friends') {
    return 'SHARED WITH ALL YOUR FRIENDS';
  }
  const names = story.selectedFriendIds
    .map((id) => friends.find((f) => f.id === id)?.name)
    .filter((n): n is string => Boolean(n));
  if (names.length === 0) return 'ONLY VISIBLE TO YOU';
  if (names.length === 1) return `SHARED WITH ${names[0].toUpperCase()}`;
  if (names.length === 2) {
    return `SHARED WITH ${names[0].toUpperCase()} AND ${names[1].toUpperCase()}`;
  }
  const shown = names.slice(0, 3).map((n) => n.toUpperCase()).join(', ');
  return `SHARED WITH ${shown} + ${names.length - 3} MORE`;
}
