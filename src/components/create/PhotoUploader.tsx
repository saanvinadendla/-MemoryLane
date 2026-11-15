import { useRef, useState } from 'react';
import {
  Upload,
  X,
  Star,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Type,
} from 'lucide-react';
import type { StoryPhoto } from '@/types/story';
import { uid } from '@/lib/storyStorage';

interface PhotoUploaderProps {
  photos: StoryPhoto[];
  coverId: string | null;
  onChange: (photos: StoryPhoto[]) => void;
  onCoverChange: (id: string | null) => void;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PhotoUploader({ photos, coverId, onChange, onCoverChange }: PhotoUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);

  const addFiles = async (files: FileList | File[]) => {
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (images.length === 0) {
      setError('Please choose image files (like JPG or PNG).');
      return;
    }
    setError(null);
    const newPhotos: StoryPhoto[] = [];
    for (const file of images) {
      const dataUrl = await fileToDataUrl(file);
      newPhotos.push({
        id: uid(),
        dataUrl,
        caption: '',
        date: '',
        location: '',
      });
    }
    onChange([...photos, ...newPhotos]);
  };

  const remove = (id: string) => onChange(photos.filter((p) => p.id !== id));

  const update = (id: string, patch: Partial<StoryPhoto>) =>
    onChange(photos.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= photos.length || from === to) return;
    const next = [...photos];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const makeCover = (id: string) => onCoverChange(coverId === id ? null : id);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-colors duration-300 sm:p-14 ${
          dragOver
            ? 'border-coral-400 bg-coral-100'
            : 'border-cream-300 bg-cream-100 hover:border-lavender-300 hover:bg-lavender-100/60'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="Upload photos"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-100 text-coral-500">
          <Upload className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <p className="mt-4 font-display text-xl font-semibold text-ink-900">
          Drag photos here, or tap to browse
        </p>
        <p className="mt-1 text-sm text-ink-700">
          JPG, PNG, or HEIC — add as many as you like.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {error && (
        <p className="mt-3 text-sm font-semibold text-blush-500" role="alert">
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <li
              key={photo.id}
              draggable
              onDragStart={(e) => {
                dragIndex.current = i;
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex.current !== null) move(dragIndex.current, i);
                dragIndex.current = null;
              }}
              className="group relative rounded-3xl border border-cream-300/70 bg-cream-50 p-3 pb-4 shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={photo.dataUrl}
                  alt={`Uploaded photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => remove(photo.id)}
                  aria-label={`Remove photo ${i + 1}`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-ink-800 opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 hover:bg-blush-200 hover:text-blush-500"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute left-2 top-2 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move earlier"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-ink-800 shadow-card disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(i, i + 1)}
                    disabled={i === photos.length - 1}
                    aria-label="Move later"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-ink-800 shadow-card disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                  <button
                    onClick={() => makeCover(photo.id)}
                    aria-pressed={coverId === photo.id}
                    aria-label={coverId === photo.id ? 'Remove as cover photo' : 'Set as cover photo'}
                    className={`absolute left-2 top-14 flex h-8 w-8 items-center justify-center rounded-full shadow-card transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                      coverId === photo.id
                        ? 'bg-butter-300 text-white opacity-100'
                        : 'bg-cream-50/90 text-ink-800 hover:bg-butter-200 hover:text-butter-500'
                    }`}
                  >
                    <Star className="h-4 w-4" fill={coverId === photo.id ? 'currentColor' : 'none'} />
                  </button>
                {coverId === photo.id && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-butter-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Cover
                  </span>
                )}
                {coverId !== photo.id && (
                  <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream-50">
                    <GripVertical className="h-3 w-3" />
                    Drag to reorder
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="relative">
                  <Type className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-700/40" />
                  <input
                    value={photo.caption}
                    onChange={(e) => update(photo.id, { caption: e.target.value })}
                    placeholder="A little caption..."
                    aria-label={`Caption for photo ${i + 1}`}
                    className="w-full rounded-full border border-cream-300 bg-cream-100 py-2 pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-700/40" />
                    <input
                      value={photo.date}
                      onChange={(e) => update(photo.id, { date: e.target.value })}
                      placeholder="Date"
                      aria-label={`Date for photo ${i + 1}`}
                      className="w-full rounded-full border border-cream-300 bg-cream-100 py-2 pl-9 pr-3 text-xs text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50"
                    />
                  </div>
                  <div className="relative flex-1">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-700/40" />
                    <input
                      value={photo.location}
                      onChange={(e) => update(photo.id, { location: e.target.value })}
                      placeholder="Place"
                      aria-label={`Location for photo ${i + 1}`}
                      className="w-full rounded-full border border-cream-300 bg-cream-100 py-2 pl-9 pr-3 text-xs text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
