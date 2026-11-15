interface SimplePageProps {
  title: string;
  note: string;
  heading: string;
  blurb: string;
}

export default function SimplePage({
  title,
  note,
  heading,
  blurb,
}: SimplePageProps) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
      <span className="font-hand text-2xl text-coral-500">{note}</span>
      <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
        {title}
      </h1>
      <div className="mx-auto mt-8 rounded-3xl border border-dashed border-lavender-300 bg-lavender-100/60 paper-dots p-10 sm:p-14">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          {blurb}
        </p>
        <span className="mt-6 inline-block rounded-full bg-cream-200 px-5 py-2 text-xs font-bold uppercase tracking-widest text-ink-700">
          Coming soon
        </span>
      </div>
    </div>
  );
}
