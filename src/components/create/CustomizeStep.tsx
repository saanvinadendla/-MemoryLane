import type { StoryTheme, StoryLayout, StoryFont, Story } from '@/types/story';

const themes: { id: StoryTheme; label: string; swatch: string; desc: string }[] = [
  {
    id: 'scrapbook',
    label: 'Scrapbook',
    swatch: 'bg-butter-200',
    desc: 'Taped-on photos, tilts, and little doodles',
  },
  {
    id: 'film',
    label: 'Film',
    swatch: 'bg-ink-900',
    desc: 'Soft grain, white borders, dated corners',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    swatch: 'bg-cream-200',
    desc: 'Clean grid, lots of air, quiet type',
  },
  {
    id: 'colorful',
    label: 'Colorful',
    swatch: 'bg-coral-300',
    desc: 'Bold pastel blocks behind every photo',
  },
];

const layouts: { id: StoryLayout; label: string; desc: string }[] = [
  { id: 'stacked', label: 'Stacked', desc: 'One big photo at a time, story-style' },
  { id: 'grid', label: 'Grid', desc: 'A tidy album grid, two per row' },
  { id: 'collage', label: 'Collage', desc: 'Scattered and overlapping, like a desk' },
];

const fonts: { id: StoryFont; label: string; previewClass: string }[] = [
  { id: 'serif', label: 'Editorial', previewClass: 'font-display' },
  { id: 'hand', label: 'Handwritten', previewClass: 'font-hand text-2xl' },
  { id: 'sans', label: 'Clean', previewClass: 'font-body font-bold' },
];

const backgrounds: { id: Story['accent']; label: string; bgClass: string; ring: string }[] = [
  { id: 'cream', label: 'Cream', bgClass: 'bg-cream-100', ring: 'ring-cream-300' },
  { id: 'lavender', label: 'Lavender', bgClass: 'bg-lavender-100', ring: 'ring-lavender-300' },
  { id: 'blush', label: 'Blush', bgClass: 'bg-blush-100', ring: 'ring-blush-300' },
  { id: 'coral', label: 'Coral', bgClass: 'bg-coral-100', ring: 'ring-coral-300' },
  { id: 'butter', label: 'Butter', bgClass: 'bg-butter-100', ring: 'ring-butter-300' },
];

interface CustomizeStepProps {
  title: string;
  intro: string;
  theme: StoryTheme;
  accent: Story['accent'];
  font: StoryFont;
  layout: StoryLayout;
  onChange: (patch: Partial<Story>) => void;
}

export default function CustomizeStep({
  title,
  intro,
  theme,
  accent,
  font,
  layout,
  onChange,
}: CustomizeStepProps) {
  const inputClass =
    'w-full rounded-2xl border border-cream-300 bg-cream-100 px-4 py-3 text-ink-800 placeholder:text-ink-700/40 focus:border-coral-300 focus:outline-none focus:ring-2 focus:ring-coral-300/50';

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="story-title" className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
          Story title
        </label>
        <input
          id="story-title"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Leave blank and we'll dream one up..."
          className={`mt-2 font-display text-2xl font-semibold ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="story-intro" className="text-xs font-bold uppercase tracking-widest text-ink-700/70">
          Introduction
        </label>
        <textarea
          id="story-intro"
          value={intro}
          onChange={(e) => onChange({ intro: e.target.value })}
          placeholder="Set the scene — or leave it to us..."
          rows={4}
          className={`mt-2 resize-none ${inputClass}`}
        />
      </div>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest text-ink-700/70">Theme</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ theme: t.id })}
              aria-pressed={theme === t.id}
              className={`rounded-2xl border p-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                theme === t.id
                  ? 'border-coral-300 bg-coral-100 shadow-card'
                  : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
              }`}
            >
              <span className={`block h-8 w-8 rounded-xl ${t.swatch}`} />
              <span className="mt-2 block text-sm font-bold text-ink-900">{t.label}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-ink-700">{t.desc}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-widest text-ink-700/70">Background</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {backgrounds.map((b) => (
              <button
                key={b.id}
                onClick={() => onChange({ accent: b.id })}
                aria-pressed={accent === b.id}
                aria-label={`${b.label} background`}
                className={`h-10 w-10 rounded-full ${b.bgClass} ring-2 ring-offset-2 ring-offset-cream-50 transition-transform duration-300 hover:scale-110 ${
                  accent === b.id ? `ring-ink-900 scale-110` : b.ring
                }`}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-widest text-ink-700/70">Text style</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {fonts.map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ font: f.id })}
                aria-pressed={font === f.id}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${f.previewClass} ${
                  font === f.id
                    ? 'border-coral-300 bg-coral-100 text-coral-500'
                    : 'border-cream-300 bg-cream-100 text-ink-700 hover:bg-cream-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest text-ink-700/70">Photo layout</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {layouts.map((l) => (
            <button
              key={l.id}
              onClick={() => onChange({ layout: l.id })}
              aria-pressed={layout === l.id}
              className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                layout === l.id
                  ? 'border-coral-300 bg-coral-100 shadow-card'
                  : 'border-cream-300 bg-cream-100 hover:bg-cream-200'
              }`}
            >
              <span className="flex gap-1">
                {l.id === 'stacked' && (
                  <>
                    <span className="h-6 w-10 rounded bg-ink-900/20" />
                  </>
                )}
                {l.id === 'grid' && (
                  <>
                    <span className="h-6 w-1/2 rounded bg-ink-900/20" />
                    <span className="h-6 w-1/2 rounded bg-ink-900/20" />
                  </>
                )}
                {l.id === 'collage' && (
                  <>
                    <span className="h-6 w-1/2 -rotate-6 rounded bg-ink-900/20" />
                    <span className="h-6 w-1/2 rotate-3 rounded bg-ink-900/20" />
                  </>
                )}
              </span>
              <span className="mt-2 block text-sm font-bold text-ink-900">{l.label}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-ink-700">{l.desc}</span>
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
