import { useState } from 'react';
import { X, Globe, Users, UserCheck, Lock, Check, Save, Send } from 'lucide-react';
import type { Story, StoryPrivacy } from '@/types/story';
import { friends } from '@/data/friendsData';
import Avatar from '@/components/friends/Avatar';

interface PublishModalProps {
  story: Story;
  onPublish: (privacy: StoryPrivacy, selectedFriendIds: string[]) => void;
  onSaveDraft: () => void;
  onClose: () => void;
}

const privacyOptions: {
  id: StoryPrivacy;
  label: string;
  desc: string;
  icon: typeof Lock;
}[] = [
  { id: 'private', label: 'Private', desc: 'Only me', icon: Lock },
  { id: 'friends', label: 'Friends', desc: 'Everyone on your friends list', icon: Users },
  { id: 'selected', label: 'Selected friends', desc: 'Only the people you pick', icon: UserCheck },
];

export default function PublishModal({
  story,
  onPublish,
  onSaveDraft,
  onClose,
}: PublishModalProps) {
  const [privacy, setPrivacy] = useState<StoryPrivacy>(story.privacy);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(story.selectedFriendIds)
  );
  const [published, setPublished] = useState(false);

  const toggleFriend = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const doPublish = () => {
    const ids = privacy === 'selected' ? Array.from(selected) : [];
    onPublish(privacy, ids);
    setPublished(true);
    window.setTimeout(onClose, 1800);
  };

  if (published) {
    return (
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Story published"
      >
        <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-card-hover">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-butter-200 text-butter-500">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900">
            {privacy === 'selected'
              ? 'Your story has been shared!'
              : 'Your story is live!'}
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            You'll find it on your My Memories shelf.
          </p>
        </div>
      </div>
    );
  }

  const canPublish = privacy !== 'selected' || selected.size > 0;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Publish your story"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Who gets to see this?
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-200 hover:text-blush-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-8">
          <div className="mt-5 space-y-2">
            {privacyOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrivacy(opt.id)}
                aria-pressed={privacy === opt.id}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                  privacy === opt.id
                    ? 'border-coral-300 bg-coral-100'
                    : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
                }`}
              >
                <opt.icon
                  className={`h-5 w-5 ${privacy === opt.id ? 'text-coral-500' : 'text-ink-700'}`}
                />
                <span className="flex-1">
                  <span className="block text-sm font-bold text-ink-900">{opt.label}</span>
                  <span className="block text-xs text-ink-700">{opt.desc}</span>
                </span>
                {privacy === opt.id && (
                  <Check className="h-4 w-4 text-coral-500" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>

          {privacy === 'selected' && (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
                Choose friends
              </p>
              <ul className="mt-2 space-y-2">
                {friends.map((f) => {
                  const active = selected.has(f.id);
                  return (
                    <li key={f.id}>
                      <button
                        onClick={() => toggleFriend(f.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition-colors duration-300 ${
                          active
                            ? 'border-coral-300 bg-coral-100'
                            : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            active
                              ? 'border-coral-500 bg-coral-500 text-white'
                              : 'border-cream-300 bg-cream-50'
                          }`}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={3.5} />}
                        </span>
                        <Avatar src={f.avatar} name={f.name} size="sm" accent={f.accent} />
                        <span className="flex-1 text-sm font-bold text-ink-900">{f.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-cream-300/60 bg-cream-50 px-6 py-5 sm:px-8">
          {privacy === 'selected' && selected.size === 0 && (
            <p className="mb-3 text-center text-xs font-semibold text-ink-700">
              Pick at least one friend below to publish, or switch to another
              privacy option.
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={doPublish}
              disabled={!canPublish}
              aria-disabled={!canPublish}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:hover:bg-coral-500"
            >
              <Globe className="h-4 w-4" />
              Publish Story
            </button>
            <button
              onClick={() => {
                onSaveDraft();
                onClose();
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cream-200 px-6 py-3 text-sm font-bold text-ink-800 transition-colors duration-300 hover:bg-lavender-200"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>
            <button
              onClick={doPublish}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-lavender-300 bg-lavender-100 px-6 py-3 text-sm font-bold text-lavender-500 transition-colors duration-300 hover:bg-lavender-200"
            >
              <Send className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
