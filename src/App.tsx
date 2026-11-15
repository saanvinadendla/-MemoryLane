import { useEffect, useState } from 'react';
import { useHashRoute } from '@/hooks/useHashRoute';
import type { Story, StoryPrivacy } from '@/types/story';
import { loadStories, uid } from '@/lib/storyStorage';
import { publishStory, saveDraft } from '@/lib/storyActions';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MemoryGrid from '@/components/MemoryGrid';
import Intro from '@/components/Intro';
import Footer from '@/components/Footer';
import FriendsPage from '@/components/friends/FriendsPage';
import StoryEditor from '@/components/create/StoryEditor';
import MyMemoriesPage from '@/components/memories/MyMemoriesPage';
import SupportPage from '@/components/support/SupportPage';
import FeelGoodCorner from '@/components/support/FeelGoodCorner';
import TimelinePage from '@/components/timeline/TimelinePage';
import ProfilePage from '@/components/profile/ProfilePage';
import { memories } from '@/data/memories';

function freshStory(): Story {
  const now = new Date().toISOString();
  return {
    id: uid(),
    title: '',
    intro: '',
    theme: 'scrapbook',
    accent: 'cream',
    font: 'serif',
    layout: 'stacked',
    coverId: null,
    photos: [],
    status: 'draft',
    privacy: 'private',
    selectedFriendIds: [],
    createdAt: now,
    updatedAt: now,
  };
}

export default function App() {
  const [page, navigate] = useHashRoute();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  useEffect(() => {
    setStories(loadStories());
  }, []);

  const openEditor = (story: Story) => {
    setEditingStory(story);
    navigate('create');
  };

  const handlePublish = (story: Story, privacy: StoryPrivacy, friendIds: string[]) => {
    publishStory(story, { privacy, selectedFriendIds: friendIds });
    setStories(loadStories());
    setEditingStory(null);
    navigate('memories');
  };

  const handleSaveDraft = (story: Story) => {
    saveDraft(story);
    setStories(loadStories());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-pink-100/40 to-cream-50">
      <Navbar page={page} onNavigate={navigate} />
      <main>
        {page === 'home' && (
          <>
            <Hero />
            <MemoryGrid />
            <Intro />
          </>
        )}
        {page === 'friends' && <FriendsPage />}
        {page === 'create' && (
          <StoryEditor
            key={editingStory?.id ?? 'new'}
            initialStory={editingStory ?? freshStory()}
            onExit={() => {
              setEditingStory(null);
              navigate('memories');
            }}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        )}
        {page === 'memories' && (
          <MyMemoriesPage
            stories={stories}
            onCreate={() => openEditor(freshStory())}
            onEdit={(story) => openEditor(story)}
            onRefresh={() => setStories(loadStories())}
          />
        )}
        {page === 'timeline' && <TimelinePage memories={memories} />}
        {page === 'support' && <SupportPage />}
        {page === 'feelgood' && <FeelGoodCorner />}
        {page === 'profile' && <ProfilePage />}
      </main>
      <Footer />
    </div>
  );
}
