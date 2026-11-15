import Avatar from '@/components/friends/Avatar';

interface FriendCardProps {
  name: string;
  avatar: string;
  accent: 'lavender' | 'blush' | 'coral' | 'butter';
  note: string;
  onView: () => void;
}

const accentStyles = {
  lavender: 'border-lavender-300 bg-lavender-100 text-lavender-500 hover:bg-lavender-200',
  blush: 'border-blush-300 bg-blush-100 text-blush-500 hover:bg-blush-200',
  coral: 'border-coral-300 bg-coral-100 text-coral-500 hover:bg-coral-200',
  butter: 'border-butter-300 bg-butter-100 text-butter-500 hover:bg-butter-200',
} as const;

export default function FriendCard({
  name,
  avatar,
  accent,
  note,
  onView,
}: FriendCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-cream-300/70 bg-cream-50 p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Avatar src={avatar} name={name} size="md" accent={accent} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-semibold text-ink-900">
          {name}
        </p>
        <p className="text-xs font-semibold text-ink-700/70">{note}</p>
      </div>
      <button
        onClick={onView}
        aria-label={`View ${name}'s profile`}
        className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors duration-300 ${accentStyles[accent]}`}
      >
        View
      </button>
    </div>
  );
}
