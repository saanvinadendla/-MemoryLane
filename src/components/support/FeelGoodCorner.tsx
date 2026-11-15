import { useMemo, useState } from 'react';
import {
  HeartHandshake,
  Heart,
  Star,
  Flower2,
  ShoppingBag,
  CalendarHeart,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Bookmark,
} from 'lucide-react';
import {
  products,
  events,
  pickMeUpOptions,
  feelGoodNote,
  loadFavorites,
  saveFavorites,
  type FeelGoodCategory,
  type FeelGoodProduct,
  type FeelGoodEvent,
  type Favorites,
} from '@/data/feelGoodData';

type Filter = 'All' | FeelGoodCategory;
const filters: Filter[] = ['All', 'Animals', 'Comfort Items', 'Creative Activities', 'Outdoor Activities'];

const categoryTone: Record<FeelGoodCategory, string> = {
  'Comfort Items': 'bg-pink-100 text-pink-500',
  Animals: 'bg-mint-100 text-mint-500',
  'Creative Activities': 'bg-lavender-100 text-lavender-500',
  'Outdoor Activities': 'bg-babyblue-100 text-babyblue-500',
};

export default function FeelGoodCorner() {
  const [filter, setFilter] = useState<Filter>('All');
  const [favorites, setFavorites] = useState<Favorites>(loadFavorites);
  const [pick, setPick] = useState<string | null>(null);

  const toggleFavorite = (kind: 'products' | 'events', id: string) => {
    setFavorites((prev) => {
      const list = prev[kind];
      const next = {
        ...prev,
        [kind]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
      };
      saveFavorites(next);
      return next;
    });
  };

  const visibleProducts = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );
  const visibleEvents = useMemo(
    () => (filter === 'All' ? events : events.filter((e) => e.category === filter)),
    [filter]
  );
  const pickCategory = pickMeUpOptions.find((o) => o.id === pick)?.category;
  const pickProducts = pickCategory
    ? products.filter((p) => p.category === pickCategory)
    : [];
  const pickEvents = pickCategory
    ? events.filter((e) => e.category === pickCategory)
    : [];

  return (
    <div className="bg-gradient-to-b from-pink-100 via-cream-50 to-lavender-100">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-200 text-pink-500 shadow-card">
            <HeartHandshake className="h-7 w-7" strokeWidth={2.2} />
          </span>
          <span className="mt-4 block font-hand text-2xl text-pink-500">
            a warm little corner
          </span>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Feel-Good Corner
          </h1>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
            Comforting things, gentle events, and small reasons to smile. A
            pick-me-up, never a treatment — please lean on professionals when
            you need real care.
          </p>
        </header>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-butter-300/60 bg-butter-100 px-5 py-4 text-sm text-ink-800">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-butter-500" />
          <p className="leading-relaxed">{feelGoodNote}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-lavender-300/40 bg-lavender-100 paper-dots p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            What would make today a little better?
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pickMeUpOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPick(pick === opt.id ? null : opt.id)}
                aria-pressed={pick === opt.id}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                  pick === opt.id
                    ? 'border-pink-300 bg-pink-200 text-pink-500'
                    : 'border-cream-300 bg-cream-50 text-ink-700 hover:bg-pink-100'
                }`}
              >
                {opt.emoji === 'heart' && <Heart className="h-4 w-4" />}
                {opt.emoji === 'star' && <Star className="h-4 w-4" />}
                {opt.emoji === 'flower' && <Flower2 className="h-4 w-4" />}
                {opt.label}
              </button>
            ))}
          </div>
          {pickCategory && (
            <div className="mt-5 space-y-4" aria-live="polite">
              <p className="text-sm font-bold text-ink-800">
                A few ideas for “{pickMeUpOptions.find((o) => o.id === pick)?.label}”
              </p>
              <div className="flex flex-wrap gap-2">
                {pickProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setFilter(p.category)}
                    className="rounded-full bg-cream-50 px-4 py-1.5 text-xs font-bold text-ink-700 shadow-card transition-colors hover:bg-pink-100"
                  >
                    {p.name}
                  </button>
                ))}
                {pickEvents.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setFilter(e.category)}
                    className="rounded-full bg-cream-50 px-4 py-1.5 text-xs font-bold text-ink-700 shadow-card transition-colors hover:bg-mint-100"
                  >
                    {e.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                filter === f
                  ? 'border-pink-300 bg-pink-200 text-pink-500'
                  : 'border-cream-300 bg-cream-50 text-ink-700 hover:bg-pink-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {pick && (
          <button
            onClick={() => setFilter('All')}
            className="mt-3 block w-full text-center text-xs font-bold uppercase tracking-widest text-pink-500 hover:text-ink-900"
          >
            Clear pick-me-up filter
          </button>
        )}

        <section aria-labelledby="new-this-week" className="mt-12">
          <h2 id="new-this-week" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
            <Sparkles className="h-5 w-5 text-pink-500" />
            New This Week
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts
              .filter((p) => p.section === 'new')
              .map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  fav={favorites.products.includes(p.id)}
                  onFav={() => toggleFavorite('products', p.id)}
                />
              ))}
          </div>
        </section>

        <section aria-labelledby="coming-up" className="mt-14">
          <h2 id="coming-up" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
            <CalendarHeart className="h-5 w-5 text-mint-500" />
            Coming Up
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {visibleEvents
              .filter((e) => e.section === 'upcoming')
              .map((e) => (
                <EventCard
                  key={e.id}
                  event={e}
                  fav={favorites.events.includes(e.id)}
                  onFav={() => toggleFavorite('events', e.id)}
                />
              ))}
          </div>
        </section>

        <section aria-labelledby="recently-added" className="mt-14">
          <h2 id="recently-added" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
            <Bookmark className="h-5 w-5 text-lavender-500" />
            Recently Added
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts
              .filter((p) => p.section === 'recent')
              .map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  fav={favorites.products.includes(p.id)}
                  onFav={() => toggleFavorite('products', p.id)}
                />
              ))}
          </div>
        </section>

        {visibleProducts.length === 0 && visibleEvents.length === 0 && (
          <p className="mt-12 rounded-3xl border border-dashed border-cream-300 bg-cream-50 p-10 text-center text-ink-700">
            Nothing in this filter yet — try another one.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  fav,
  onFav,
}: {
  product: FeelGoodProduct;
  fav: boolean;
  onFav: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-cream-300/70 bg-pink-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={onFav}
          aria-label={fav ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
          aria-pressed={fav}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-ink-700 shadow-card transition-colors hover:bg-blush-200 hover:text-blush-500"
        >
          <Heart className="h-4 w-4" fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className={`self-start rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryTone[product.category]}`}>
          {product.category}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">{product.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-700">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-pink-500">{product.price}</span>
          <a
            href={product.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-card transition-colors hover:bg-ink-900"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Shop Now
          </a>
        </div>
      </div>
    </article>
  );
}

function EventCard({
  event,
  fav,
  onFav,
}: {
  event: FeelGoodEvent;
  fav: boolean;
  onFav: () => void;
}) {
  return (
    <article className="group flex overflow-hidden rounded-3xl border border-cream-300/70 bg-mint-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative w-32 shrink-0 sm:w-40">
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <button
          onClick={onFav}
          aria-label={fav ? `Remove ${event.name} from favorites` : `Save ${event.name} to favorites`}
          aria-pressed={fav}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-ink-700 shadow-card transition-colors hover:bg-blush-200 hover:text-blush-500"
        >
          <Heart className="h-3.5 w-3.5" fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className={`self-start rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryTone[event.category]}`}>
          {event.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink-900">{event.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-ink-700/70">
          <Clock className="h-3 w-3" /> {event.date} · {event.time}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-ink-700/70">
          <MapPin className="h-3 w-3" /> {event.location}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">{event.description}</p>
        <a
          href={event.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-mint-500 px-5 py-2.5 text-xs font-bold text-white shadow-card transition-colors hover:bg-ink-900"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {event.websiteLabel}
        </a>
      </div>
    </article>
  );
}
