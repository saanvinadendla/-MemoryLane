export type StoryTheme = 'scrapbook' | 'film' | 'minimalist' | 'colorful';
export type StoryLayout = 'stacked' | 'grid' | 'collage';
export type StoryFont = 'serif' | 'hand' | 'sans';
export type StoryPrivacy = 'private' | 'friends' | 'selected';
export type StoryStatus = 'published' | 'draft';

export interface StoryPhoto {
  id: string;
  dataUrl: string;
  caption: string;
  date: string;
  location: string;
}

export interface Story {
  id: string;
  title: string;
  intro: string;
  theme: StoryTheme;
  accent: 'cream' | 'lavender' | 'blush' | 'coral' | 'butter';
  font: StoryFont;
  layout: StoryLayout;
  coverId: string | null;
  photos: StoryPhoto[];
  status: StoryStatus;
  privacy: StoryPrivacy;
  selectedFriendIds: string[];
  createdAt: string;
  updatedAt: string;
}
