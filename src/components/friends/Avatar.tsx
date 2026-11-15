interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: 'lavender' | 'blush' | 'coral' | 'butter';
}

const sizeClass = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
} as const;

const ringClass = {
  lavender: 'ring-lavender-300',
  blush: 'ring-blush-300',
  coral: 'ring-coral-300',
  butter: 'ring-butter-300',
} as const;

const initialBg = {
  lavender: 'bg-lavender-200 text-lavender-500',
  blush: 'bg-blush-200 text-blush-500',
  coral: 'bg-coral-200 text-coral-500',
  butter: 'bg-butter-200 text-butter-500',
} as const;

export default function Avatar({
  src,
  name,
  size = 'md',
  accent = 'lavender',
}: AvatarProps) {
  if (!src) {
    return (
      <span
        aria-hidden
        className={`${sizeClass[size]} ${initialBg[accent]} flex shrink-0 items-center justify-center rounded-full font-display font-bold ring-2 ring-offset-2 ring-offset-cream-50 ${ringClass[accent]}`}
      >
        {name.trim().charAt(0).toUpperCase() || '?'}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={`${name}'s profile picture`}
      loading="lazy"
      className={`${sizeClass[size]} shrink-0 rounded-full object-cover ring-2 ring-offset-2 ring-offset-cream-50 ${ringClass[accent]}`}
    />
  );
}
