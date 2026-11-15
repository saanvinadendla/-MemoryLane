import type { Story } from '@/types/story';

const KEY = 'alibi_stories_v1';

export function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadStories(): Story[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Story[]) : [];
  } catch {
    return [];
  }
}

function persist(stories: Story[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(stories));
    return true;
  } catch {
    return false;
  }
}

export function saveStory(story: Story): boolean {
  const all = loadStories();
  const idx = all.findIndex((s) => s.id === story.id);
  if (idx >= 0) all[idx] = story;
  else all.unshift(story);
  return persist(all);
}

export function getStory(id: string): Story | undefined {
  return loadStories().find((s) => s.id === id);
}

export function deleteStory(id: string): boolean {
  const all = loadStories();
  const next = all.filter((s) => s.id !== id);
  return persist(next);
}
