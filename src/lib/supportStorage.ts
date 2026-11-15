import { uid } from '@/lib/storyStorage';

export type SupportCategory =
  | 'Need Advice'
  | 'Rough Day'
  | 'Feeling Overwhelmed'
  | 'Just Need to Vent';

export interface SupportComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  hearts: number;
  heartedByMe: boolean;
  savedByMe: boolean;
}

export interface SupportPost {
  id: string;
  title: string;
  body: string;
  category: SupportCategory;
  anonymous: boolean;
  author: string;
  createdAt: string;
  hugs: number;
  huggedByMe: boolean;
  comments: SupportComment[];
}

export const supportCategories: SupportCategory[] = [
  'Need Advice',
  'Rough Day',
  'Feeling Overwhelmed',
  'Just Need to Vent',
];

const YOU = 'You';

export function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return 'just now';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const seedPosts: SupportPost[] = [
  {
    id: 'seed-1',
    title: 'First week in a new city and it’s quieter than I expected',
    body: 'I moved for work and everyone’s been lovely, but the evenings feel very long. How did you all get through the early days somewhere new?',
    category: 'Feeling Overwhelmed',
    anonymous: true,
    author: 'Anonymous',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    hugs: 12,
    huggedByMe: false,
    comments: [
      {
        id: 'seed-1-c1',
        author: 'June Okafor',
        text: 'I’m here for you. The first month is the hardest — try one tiny routine that’s just yours. It gets lighter, honestly.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        hearts: 5,
        heartedByMe: false,
        savedByMe: false,
      },
    ],
  },
  {
    id: 'seed-2',
    title: 'Rough day at work, just needed to say it somewhere',
    body: 'Nothing dramatic happened. It was just one of those days where nothing landed and I drove home with my jaw clenched. Saying it here so it doesn’t follow me into tomorrow.',
    category: 'Rough Day',
    anonymous: false,
    author: 'Leo Marchetti',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    hugs: 7,
    huggedByMe: false,
    comments: [],
  },
];

const KEY = 'alibi_support_v1';

export function loadPosts(): SupportPost[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedPosts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SupportPost[]) : [];
  } catch {
    return seedPosts;
  }
}

function persist(posts: SupportPost[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(posts));
    return true;
  } catch {
    return false;
  }
}

export function addPost(
  input: { title: string; body: string; category: SupportCategory; anonymous: boolean }
): SupportPost[] {
  const posts = loadPosts();
  const post: SupportPost = {
    id: uid(),
    ...input,
    author: input.anonymous ? 'Anonymous' : YOU,
    createdAt: new Date().toISOString(),
    hugs: 0,
    huggedByMe: false,
    comments: [],
  };
  persist([post, ...posts]);
  return loadPosts();
}

export function removePost(id: string): SupportPost[] {
  const posts = loadPosts().filter((p) => p.id !== id);
  persist(posts);
  return posts;
}

export function toggleHug(id: string): SupportPost[] {
  const posts = loadPosts().map((p) =>
    p.id === id
      ? { ...p, huggedByMe: !p.huggedByMe, hugs: p.hugs + (p.huggedByMe ? -1 : 1) }
      : p
  );
  persist(posts);
  return posts;
}

export function addComment(
  postId: string,
  text: string
): SupportPost[] {
  const posts = loadPosts().map((p) =>
    p.id === postId
      ? {
          ...p,
          comments: [
            ...p.comments,
            {
              id: uid(),
              author: YOU,
              text,
              createdAt: new Date().toISOString(),
              hearts: 0,
              heartedByMe: false,
              savedByMe: false,
            },
          ],
        }
      : p
  );
  persist(posts);
  return posts;
}

export function toggleCommentHeart(
  postId: string,
  commentId: string
): SupportPost[] {
  const posts = loadPosts().map((p) =>
    p.id === postId
      ? {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId
              ? { ...c, heartedByMe: !c.heartedByMe, hearts: c.hearts + (c.heartedByMe ? -1 : 1) }
              : c
          ),
        }
      : p
  );
  persist(posts);
  return posts;
}

export function toggleCommentSave(postId: string, commentId: string): SupportPost[] {
  const posts = loadPosts().map((p) =>
    p.id === postId
      ? {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId ? { ...c, savedByMe: !c.savedByMe } : c
          ),
        }
      : p
  );
  persist(posts);
  return posts;
}
