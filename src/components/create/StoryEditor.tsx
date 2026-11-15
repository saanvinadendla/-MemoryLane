import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Images,
  SlidersHorizontal,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';
import type {
  Story,
  StoryPhoto,
  StoryPrivacy,
} from '@/types/story';
import {
  generateTitle,
  generateCaptions,
  generateIntro,
} from '@/lib/storyGeneration';
import PhotoUploader from '@/components/create/PhotoUploader';
import CustomizeStep from '@/components/create/CustomizeStep';
import GenerateStep from '@/components/create/GenerateStep';
import StoryPreview from '@/components/create/StoryPreview';
import PublishModal from '@/components/create/PublishModal';

const steps = [
  { label: 'Add Memories', icon: Images },
  { label: 'Customize', icon: SlidersHorizontal },
  { label: 'Generate', icon: Sparkles },
];

export interface StoryEditorHandle {
  story: Story;
  setPatch: (patch: Partial<Story>) => void;
}

interface StoryEditorProps {
  initialStory: Story;
  onExit: () => void;
  onPublish: (story: Story, privacy: StoryPrivacy, friendIds: string[]) => void;
  onSaveDraft: (story: Story) => void;
}

export default function StoryEditor({
  initialStory,
  onExit,
  onPublish,
  onSaveDraft,
}: StoryEditorProps) {
  const [story, setStory] = useState<Story>(initialStory);
  const [step, setStep] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  const setPatch = (patch: Partial<Story>) =>
    setStory((prev) => ({ ...prev, ...patch }));

  const setPhotos = (photos: StoryPhoto[]) => setPatch({ photos });

  const canProceed = story.photos.length > 0;

  const generate = () => {
    setStory((prev) => ({
      ...prev,
      title: prev.title.trim() || generateTitle(),
      intro: prev.intro.trim() || generateIntro(prev.photos.length),
      photos: generateCaptions(prev.photos),
    }));
  };

  const openPreview = () => {
    if (!story.title.trim() || !story.intro.trim()) generate();
    setPreviewOpen(true);
  };

  return (
    <div className="bg-gradient-to-b from-butter-100/60 via-cream-50 to-peach-100/60">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-hand text-2xl text-coral-500">a new keepsake</span>
          <h1 className="mt-1 font-display text-3xl font-medium text-ink-900 sm:text-4xl">
            Create a Story
          </h1>
        </div>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full bg-cream-200 px-4 py-2 text-sm font-bold text-ink-800 transition-colors hover:bg-blush-200"
        >
          <X className="h-4 w-4" />
          Exit
        </button>
      </header>

      <ol className="mt-8 flex items-center gap-2 sm:gap-4" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <button
              onClick={() => (i < step ? setStep(i) : i === step ? undefined : canProceed && setStep(i))}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                i === step
                  ? 'bg-coral-500 text-white shadow-card'
                  : i < step
                    ? 'bg-butter-200 text-butter-500'
                    : 'bg-cream-200 text-ink-700/50'
              }`}
              aria-current={i === step ? 'step' : undefined}
              aria-label={`Step ${i + 1}: ${s.label}`}
            >
              <s.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
            </button>
            <span
              className={`hidden text-sm font-bold sm:block ${
                i === step ? 'text-ink-900' : 'text-ink-700/50'
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                  i < step ? 'bg-butter-300' : 'bg-cream-300'
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        {step === 0 && (
          <PhotoUploader
            photos={story.photos}
            coverId={story.coverId}
            onChange={setPhotos}
            onCoverChange={(id) => setPatch({ coverId: id })}
          />
        )}
        {step === 1 && (
          <CustomizeStep
            title={story.title}
            intro={story.intro}
            theme={story.theme}
            accent={story.accent}
            font={story.font}
            layout={story.layout}
            onChange={setPatch}
          />
        )}
        {step === 2 && <GenerateStep story={story} onGenerate={generate} />}
      </div>

      <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-cream-300/60 pt-6 sm:flex-row">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-700 transition-colors hover:text-coral-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={() => setPublishOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-200 px-6 py-3 text-sm font-bold text-ink-800 transition-colors hover:bg-lavender-200"
          >
            Save or Publish
          </button>
          {step < 2 ? (
            <button
              onClick={() => canProceed && setStep(step + 1)}
              disabled={!canProceed}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 disabled:opacity-40"
            >
              Next: {steps[step + 1]?.label}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={openPreview}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900"
            >
              <Eye className="h-4 w-4" />
              Preview Story
            </button>
          )}
        </div>
      </div>

      {previewOpen && (
        <StoryPreview story={story} onClose={() => setPreviewOpen(false)} />
      )}
      {publishOpen && (
        <PublishModal
          story={story}
          onPublish={(privacy, ids) => onPublish(story, privacy, ids)}
          onSaveDraft={() => onSaveDraft(story)}
          onClose={() => setPublishOpen(false)}
        />
      )}
      </div>
    </div>
  );
}
