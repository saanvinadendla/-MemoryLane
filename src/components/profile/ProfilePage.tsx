import { useEffect, useState } from 'react';
import { Heart, Bookmark, Trash2, Settings, UserRound } from 'lucide-react';
import { loadFavorites, saveFavorites, products, events, type Favorites } from '@/data/feelGoodData';

export default function ProfilePage() {
  const [favorites, setFavorites] = useState<Favorites>({ products: [], events: [] });

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const favProducts = products.filter((p) => favorites.products.includes(p.id));
  const favEvents = events.filter((e) => favorites.events.includes(e.id));

  const unfavorite = (kind: 'products' | 'events', id: string) => {
    const next: Favorites = {
      ...favorites,
      [kind]: favorites[kind].filter((x) => x !== id),
    };
    saveFavorites(next);
    setFavorites(next);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <header>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-lavender-200 text-lavender-500 shadow-card">
          <UserRound className="h-7 w-7" strokeWidth={2.2} />
        </span>
        <span className="mt-4 block text-center font-hand text-2xl text-lavender-500">
          your corner of ALIBI
        </span>
        <h1 className="mt-1 text-center font-display text-4xl font-medium text-ink-900 sm:text-5xl">
          Profile &amp; Settings
        </h1>
      </header>

      <section aria-labelledby="fav-products" className="mt-12">
        <h2 id="fav-products" className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
          <Heart className="h-5 w-5 text-pink-500" fill="currentColor" />
          Saved Comfort Items
        </h2>
        {favProducts.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {favProducts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 rounded-3xl border border-cream-300/70 bg-pink-100 p-4 shadow-card">
                <img src={p.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-lg font-semibold text-ink-900">{p.name}</h3>
                  <span className="text-sm font-bold text-pink-500">{p.price}</span>
                </div>
                <button
                  onClick={() => unfavorite('products', p.id)}
                  aria-label={`Remove ${p.name} from saved`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-blush-200 hover:text-blush-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-8 text-center text-sm text-ink-700">
            Nothing saved yet — tap the heart on any comfort item in the Feel-Good Corner.
          </p>
        )}
      </section>

      <section aria-labelledby="fav-events" className="mt-12">
        <h2 id="fav-events" className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
          <Bookmark className="h-5 w-5 text-mint-500" />
          Saved Events
        </h2>
        {favEvents.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {favEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-4 rounded-3xl border border-cream-300/70 bg-mint-100 p-4 shadow-card">
                <img src={e.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-lg font-semibold text-ink-900">{e.name}</h3>
                  <span className="text-xs font-bold text-ink-700/70">{e.date} · {e.location}</span>
                </div>
                <button
                  onClick={() => unfavorite('events', e.id)}
                  aria-label={`Remove ${e.name} from saved`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700/50 transition-colors hover:bg-blush-200 hover:text-blush-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-cream-100 p-8 text-center text-sm text-ink-700">
            No events saved yet — tap the heart on any event in the Feel-Good Corner.
          </p>
        )}
      </section>

      <section aria-labelledby="settings-heading" className="mt-12 rounded-3xl border border-cream-300/70 bg-lavender-100/60 p-6 paper-dots sm:p-8">
        <h2 id="settings-heading" className="flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
          <Settings className="h-5 w-5 text-lavender-500" />
          Preferences
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-700">
          Your stories, drafts, privacy choices, favorites, and support posts are
          all saved right here on this device, so they'll be waiting for you
          whenever you come back.
        </p>
      </section>
    </div>
  );
}
