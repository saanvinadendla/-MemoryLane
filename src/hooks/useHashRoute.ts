import { useEffect, useState } from 'react';

export type Page = 'home' | 'memories' | 'timeline' | 'friends' | 'create' | 'support' | 'feelgood' | 'profile';

const validPages: Page[] = ['home', 'memories', 'timeline', 'friends', 'create', 'support', 'feelgood', 'profile'];

function readHash(): Page {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  return validPages.includes(hash as Page) ? (hash as Page) : 'home';
}

export function useHashRoute(): [Page, (p: Page) => void] {
  const [page, setPage] = useState<Page>(readHash);

  useEffect(() => {
    const onHashChange = () => {
      setPage(readHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (p: Page) => {
    window.location.hash = p === 'home' ? '/' : `/${p}`;
  };

  return [page, navigate];
}
