import type { StoryPhoto } from '@/types/story';

const titleSeeds = [
  'Golden Hour Days',
  'The Little Chapter',
  'Paper Hearts & Sunlight',
  'Where We Wandered',
  'Sunlit and Slow',
  'The Good Sort of Ordinary',
  'Collected Little Joys',
  'Moments Worth Keeping',
];

const captionSeeds = [
  'The light was doing that thing again — the good one.',
  'We meant to stay an hour. We stayed until dark.',
  'Nobody took this too seriously, which is why it worked.',
  'A small moment that felt bigger than the day around it.',
  'Proof that the best plans are barely plans at all.',
  'Someone said “last one” and we all knew it wasn’t.',
  'Quiet, warm, and completely worth remembering.',
  'This one gets told at every dinner, so here it is in writing.',
];

const introTemplates = [
  (n: number) =>
    `A little collection of ${n} moment${n === 1 ? '' : 's'} that felt too good to leave on a camera roll. Some are big, most are small — all of them are worth flipping back through.`,
  (n: number) =>
    `This is chapter one of the good stuff: ${n} snapshot${n === 1 ? '' : 's'}, a few words to go with them, and the quiet promise to keep more like this.`,
  () =>
    `We didn’t plan much, and that turned out to be the whole point. Here’s how it felt, saved the way it happened.`,
  (n: number) =>
    `${n} little moment${n === 1 ? '' : 's'} from an ordinary stretch of days that turned out not to be ordinary at all.`,
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTitle(): string {
  return pick(titleSeeds);
}

export function generateCaptions(photos: StoryPhoto[]): StoryPhoto[] {
  const used = new Set<string>();
  return photos.map((p, i) => {
    if (p.caption.trim()) return p;
    let seed = captionSeeds[(i * 3 + Math.floor(i / captionSeeds.length)) % captionSeeds.length];
    let guard = 0;
    while (used.has(seed) && guard < captionSeeds.length) {
      i += 1;
      seed = captionSeeds[i % captionSeeds.length];
      guard += 1;
    }
    used.add(seed);
    return { ...p, caption: seed };
  });
}

export function generateIntro(photoCount: number): string {
  const template = pick(introTemplates);
  return template(photoCount);
}
