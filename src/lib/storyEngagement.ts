import { friends } from '@/data/friendsData';

export interface StoryComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  replyToId?: string;
}

export interface StoryEngagement {
  likedByMe: boolean;
  likedBy: string[];
  comments: StoryComment[];
}

const KEY = 'alibi_engagement_v1';

type Store = Record<string, StoryEngagement>;

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

function saveStore(store: Store): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // storage full or unavailable — engagement is non-critical
  }
}

function seedLikedBy(storyId: string): string[] {
  const names = friends.map((f) => f.name);
  const count = 2 + (storyId.length % 3);
  const start = storyId.charCodeAt(0) % names.length;
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(names[(start + i * 2) % names.length]);
  }
  return Array.from(new Set(picked));
}

export function loadEngagement(storyId: string): StoryEngagement {
  const store = loadStore();
  if (store[storyId]) return store[storyId];
  return { likedByMe: false, likedBy: seedLikedBy(storyId), comments: [] };
}

function update(storyId: string, fn: (e: StoryEngagement) => StoryEngagement): StoryEngagement {
  const store = loadStore();
  const current = store[storyId] ?? {
    likedByMe: false,
    likedBy: seedLikedBy(storyId),
    comments: [],
  };
  const next = fn({ ...current, likedBy: [...current.likedBy], comments: [...current.comments] });
  store[storyId] = next;
  saveStore(store);
  return next;
}

export function toggleLike(storyId: string): StoryEngagement {
  return update(storyId, (e) => ({
    ...e,
    likedByMe: !e.likedByMe,
  }));
}

export function addComment(
  storyId: string,
  text: string,
  replyTo?: StoryComment
): StoryEngagement {
  return update(storyId, (e) => ({
    ...e,
    comments: [
      ...e.comments,
      {
        id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        author: 'You',
        text,
        createdAt: new Date().toISOString(),
        replyToId: replyTo?.id,
      },
    ],
  }));
}

export function editComment(storyId: string, commentId: string, text: string): StoryEngagement {
  return update(storyId, (e) => ({
    ...e,
    comments: e.comments.map((c) => (c.id === commentId ? { ...c, text } : c)),
  }));
}

export function deleteComment(storyId: string, commentId: string): StoryEngagement {
  return update(storyId, (e) => ({
    ...e,
    comments: e.comments.filter((c) => c.id !== commentId && c.replyToId !== commentId),
  }));
}
