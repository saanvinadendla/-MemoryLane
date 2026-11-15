import type { Story, StoryPrivacy } from '@/types/story';
import { saveStory } from '@/lib/storyStorage';

export interface PublishMeta {
  privacy: StoryPrivacy;
  selectedFriendIds: string[];
}

export function publishStory(story: Story, meta: PublishMeta): Story {
  const next: Story = {
    ...story,
    status: 'published',
    privacy: meta.privacy,
    selectedFriendIds: meta.selectedFriendIds,
    updatedAt: new Date().toISOString(),
  };
  saveStory(next);
  return next;
}

export function saveDraft(story: Story): Story {
  const next: Story = {
    ...story,
    status: 'draft',
    updatedAt: new Date().toISOString(),
  };
  saveStory(next);
  return next;
}
