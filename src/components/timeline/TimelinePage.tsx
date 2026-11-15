import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Camera,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
} from 'lucide-react';
import type { Story } from '@/types/story';
import type { Memory } from '@/data/memories';
import { loadStories } from '@/lib/storyStorage';
import { fontClass, privacySubtitle } from '@/lib/storyDisplay';

interface TimelineItem {
  id: string;
  kind: 'memory' | 'story';
  title: string;
  note: string;
  image: string | null;
  dateISO: string;
  isPrivate: boolean;
  story?: Story;
}

interface DayBucket {
  dateISO: string;
  items: TimelineItem[];
}

function parseDate(s: string): Date | null {
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function TimelinePage({ memories }: { memories: Memory[] }) {
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [calCursor, setCalCursor] = useState(() => new Date());

  const items = useMemo<TimelineItem[]>(() => {
    const storyItems: TimelineItem[] = loadStories().map((s) => ({
      id: `story-${s.id}`,
      kind: 'story' as const,
      title: s.title || 'Untitled story',
      note: s.intro,
      image: (s.photos.find((p) => p.id === s.coverId) ?? s.photos[0])?.dataUrl ?? null,
      dateISO: s.createdAt,
      isPrivate: s.privacy === 'private',
      story: s,
    }));
    const memoryItems: TimelineItem[] = memories.map((m) => {
      const d = parseDate(m.date);
      return {
        id: `memory-${m.id}`,
        kind: 'memory' as const,
        title: m.title,
        note: m.caption,
        image: m.image,
        dateISO: d ? d.toISOString() : '',
        isPrivate: false,
      };
    });
    return [...storyItems, ...memoryItems]
      .filter((i) => i.dateISO)
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  }, [memories]);

  const buckets = useMemo<DayBucket[]>(() => {
    const map = new Map<string, TimelineItem[]>();
    for (const item of items) {
      const day = isoDay(new Date(item.dateISO));
      map.set(day, [...(map.get(day) ?? []), item]);
    }
    return Array.from(map.entries())
      .map(([dateISO, dayItems]) => ({ dateISO, items: dayItems }))
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  }, [items]);

  const selectedDay = openDay ? buckets.find((b) => b.dateISO === openDay) : null;

  const monthDays = useMemo(() => {
    const year = calCursor.getFullYear();
    const month = calCursor.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    const days: { date: Date; inMonth: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push({ date: d, inMonth: d.getMonth() === month });
    }
    return days;
  }, [calCursor]);

  const dayCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of buckets) counts.set(b.dateISO, b.items.length);
    return counts;
  }, [buckets]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="font-hand text-2xl text-babyblue-500">the long view</span>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Timeline
          </h1>
          <p className="mt-3 max-w-md leading-relaxed text-ink-700">
            One ribbon of your moments — photos, stories, and the days they
            happened, all in order.
          </p>
        </div>
        <div className="flex rounded-full border border-cream-300 bg-cream-100 p-1 shadow-card">
          {(['timeline', 'calendar'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold capitalize transition-colors duration-300 ${
                view === v ? 'bg-pink-200 text-pink-500' : 'text-ink-700 hover:text-pink-500'
              }`}
            >
              {v === 'calendar' && <CalendarDays className="h-4 w-4" />}
              {v}
            </button>
          ))}
        </div>
      </header>

      {view === 'timeline' ? (
        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute left-[19px] top-0 h-full w-0.5 bg-gradient-to-b from-pink-300 via-lavender-300 to-babyblue-300 sm:left-1/2 sm:-translate-x-1/2"
          />
          <ol className="space-y-10">
            {buckets.map((bucket, i) => (
              <li key={bucket.dateISO} className="relative pl-12 sm:pl-0">
                <button
                  onClick={() => setOpenDay(bucket.dateISO)}
                  aria-label={`Open ${bucket.dateISO} with ${bucket.items.length} memories`}
                  className={`absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-cream-50 shadow-card transition-transform duration-300 hover:scale-110 sm:left-1/2 sm:-translate-x-1/2 ${
                    i % 2 === 0 ? 'bg-pink-200 text-pink-500' : 'bg-babyblue-200 text-babyblue-500'
                  }`}
                >
                  {bucket.items[0].kind === 'story' ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                <div className={`sm:flex ${i % 2 === 0 ? '' : 'sm:flex-row-reverse'}`}>
                  <div className="hidden w-1/2 sm:block" />
                  <div className="sm:w-1/2 sm:px-8">
                    <button
                      onClick={() => setOpenDay(bucket.dateISO)}
                      className="w-full rounded-3xl border border-cream-300/70 bg-cream-50 p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <time className="text-[11px] font-bold uppercase tracking-widest text-ink-700/60">
                        {new Date(bucket.dateISO + 'T12:00:00').toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <div className="mt-2 flex items-start gap-3">
                        {bucket.items[0].image && (
                          <img
                            src={bucket.items[0].image}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-lg font-semibold text-ink-900">
                            {bucket.items[0].title}
                          </h3>
                          {bucket.items.length > 1 && (
                            <p className="text-xs font-bold text-pink-500">
                              + {bucket.items.length - 1} more that day
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-cream-300/70 bg-cream-50 p-5 shadow-card sm:p-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCalCursor(new Date(calCursor.getFullYear(), calCursor.getMonth() - 1, 1))}
              aria-label="Previous month"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-ink-800 transition-colors hover:bg-pink-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              {calCursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => setCalCursor(new Date(calCursor.getFullYear(), calCursor.getMonth() + 1, 1))}
              aria-label="Next month"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-ink-800 transition-colors hover:bg-pink-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-widest text-ink-700/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {monthDays.map(({ date, inMonth }) => {
              const key = isoDay(date);
              const count = dayCounts.get(key) ?? 0;
              return (
                <button
                  key={key}
                  onClick={() => count > 0 && setOpenDay(key)}
                  disabled={count === 0}
                  aria-label={`${count} memor${count === 1 ? 'y' : 'ies'} on ${key}`}
                  className={`relative flex aspect-square items-center justify-center rounded-2xl text-sm font-bold transition-all duration-200 ${
                    !inMonth
                      ? 'text-ink-700/25'
                      : count > 0
                        ? 'bg-pink-100 text-ink-900 ring-2 ring-pink-300 hover:scale-105 hover:bg-pink-200'
                        : 'text-ink-700/50'
                  } ${count > 1 ? 'bg-gradient-to-br from-pink-100 to-lavender-100' : ''}`}
                >
                  {date.getDate()}
                  {count > 1 && (
                    <span className="absolute bottom-1.5 flex gap-0.5">
                      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                        <span key={i} className="h-1 w-1 rounded-full bg-pink-500" />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDay && (
        <DayDetail bucket={selectedDay} onClose={() => setOpenDay(null)} />
      )}
    </div>
  );
}

function DayDetail({ bucket, onClose }: { bucket: DayBucket; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Memories from ${bucket.dateISO}`}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-cream-300/60 px-6 py-4">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            {new Date(bucket.dateISO + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close day view"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-200 hover:text-blush-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {bucket.items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-3xl border border-cream-300/70 p-4"
            >
              {item.image ? (
                <img src={item.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
              ) : (
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-lavender-100 text-lavender-500">
                  <BookOpen className="h-7 w-7" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    item.kind === 'story' ? 'bg-butter-200 text-butter-500' : 'bg-mint-100 text-mint-500'
                  }`}>
                    {item.kind === 'story' ? <BookOpen className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
                    {item.kind === 'story' ? 'Story' : 'Memory'}
                  </span>
                  {item.isPrivate && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-700/60">
                      <Lock className="h-2.5 w-2.5" /> Private
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-ink-900">{item.title}</h3>
                {item.note && (
                  <p className={`mt-1 text-sm leading-relaxed text-ink-700 ${item.story ? fontClass[item.story.font] : ''}`}>
                    {item.note}
                  </p>
                )}
                {item.story && (
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-ink-700/50">
                    {privacySubtitle(item.story)}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
