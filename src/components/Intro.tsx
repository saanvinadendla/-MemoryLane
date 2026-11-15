import { Camera, PenLine, BookHeart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Add your photos',
    body: 'Drop in the pictures from your camera roll — a birthday, a beach day, an ordinary Tuesday.',
    accent: 'bg-coral-100 text-coral-500',
  },
  {
    icon: PenLine,
    title: 'Write the little things',
    body: 'ALIBI prompts you for the details worth remembering: who was there, what it smelled like, what you laughed about.',
    accent: 'bg-lavender-100 text-lavender-500',
  },
  {
    icon: BookHeart,
    title: 'Keep the story',
    body: 'Everything becomes a warm, beautifully laid-out page in your personal scrapbook — private, or shared with the people in it.',
    accent: 'bg-butter-100 text-butter-500',
  },
];

export default function Intro() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-cream-300/60 bg-lavender-100/60 paper-dots"
      aria-labelledby="intro-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-hand text-2xl text-coral-500">
            how it works
          </span>
          <h2
            id="intro-heading"
            className="mt-1 font-display text-4xl font-medium leading-tight text-ink-900 sm:text-5xl"
          >
            Everyday moments become personal stories
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            ALIBI is a digital scrapbook that takes the photos you already have
            and turns them into something worth flipping through years from
            now. No design skills needed — just memories.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body, accent }, i) => (
            <div
              key={title}
              className="group rounded-3xl border border-cream-300/70 bg-cream-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${accent}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <span className="font-display text-5xl font-light text-ink-900/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-700">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#/create"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-base font-bold text-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-coral-500 hover:shadow-card-hover"
          >
            ＋ Create Your First Story
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
