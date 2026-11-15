export type FeelGoodCategory =
  | 'Comfort Items'
  | 'Animals'
  | 'Creative Activities'
  | 'Outdoor Activities';

export interface FeelGoodProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: FeelGoodCategory;
  section: 'new' | 'recent';
  shopUrl: string;
  affiliateNote?: string;
}

export interface FeelGoodEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: FeelGoodCategory;
  section: 'upcoming' | 'recent';
  websiteUrl: string;
  websiteLabel: string;
}

export const feelGoodNote =
  'Sample listings to show how this corner works. Products and events below link to real, well-known organizations — but dates, prices, and availability are illustrative until this corner is connected to a live events source.';

export const products: FeelGoodProduct[] = [
  {
    id: 'p1',
    name: 'Pocket Panda Squishy',
    description: 'A slow-rising squishy for fidgety moments. Fits in a jacket pocket.',
    price: '$9',
    image:
      'https://images.pexels.com/photos/9765308/pexels-photo-9765308.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Comfort Items',
    section: 'new',
    shopUrl: 'https://www.amazon.com/s?k=squishy+stress+toy',
  },
  {
    id: 'p2',
    name: 'Weighted Cloud Blanket',
    description: 'A heavy, hug-like blanket for the coziest possible evening in.',
    price: '$49',
    image:
      'https://images.pexels.com/photos/40798339/pexels-photo-40798339.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Comfort Items',
    section: 'recent',
    shopUrl: 'https://www.amazon.com/s?k=weighted+blanket',
  },
  {
    id: 'p3',
    name: 'The Tiny Joys Journal',
    description: 'One gentle prompt a day, so bad days leave a smaller mark.',
    price: '$18',
    image:
      'https://images.pexels.com/photos/6093/hands-notebook-notes-view.jpg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Creative Activities',
    section: 'new',
    shopUrl: 'https://www.barnesandnoble.com/s/journal',
  },
  {
    id: 'p4',
    name: 'Watercolor Starter Set',
    description: 'Twelve colors, two brushes, zero rules. Make something wobbly and wonderful.',
    price: '$24',
    image:
      'https://images.pexels.com/photos/6925029/pexels-photo-6925029.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Creative Activities',
    section: 'recent',
    shopUrl: 'https://www.dickblick.com/search/?q=watercolor+set',
  },
  {
    id: 'p5',
    name: 'Sensory Slime Lab Kit',
    description: 'Textured, satisfying, quietly meditative. Weirdly good for stress.',
    price: '$14',
    image:
      'https://images.pexels.com/photos/6144293/pexels-photo-6144293.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Comfort Items',
    section: 'new',
    shopUrl: 'https://www.michaels.com/search?q=slime+kit',
  },
  {
    id: 'p6',
    name: 'Plush Companion (Large)',
    description: 'An unreasonable amount of softness for the end of the bed.',
    price: '$32',
    image:
      'https://images.pexels.com/photos/5868299/pexels-photo-5868299.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Comfort Items',
    section: 'recent',
    shopUrl: 'https://www.amazon.com/s?k=giant+plush+animal',
  },
];

export const events: FeelGoodEvent[] = [
  {
    id: 'e1',
    name: 'Puppy Social Hour',
    description: 'Puppies, bubbles, and a lawn. What more could a Tuesday need?',
    date: 'Nov 18, 2026',
    time: '4:00 PM – 5:30 PM',
    location: 'Greenfield Park',
    image:
      'https://images.pexels.com/photos/12538676/pexels-photo-12538676.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Animals',
    section: 'upcoming',
    websiteUrl: 'https://www.petfinder.com/',
    websiteLabel: 'Register with Petfinder partners',
  },
  {
    id: 'e2',
    name: 'Cat Café Morning',
    description: 'Coffee, quiet, and a cat asleep on the good chair. Unbeatable.',
    date: 'Nov 21, 2026',
    time: '9:00 AM – 12:00 PM',
    location: 'Whiskers & Cream Café',
    image:
      'https://images.pexels.com/photos/24907746/pexels-photo-24907746.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Animals',
    section: 'upcoming',
    websiteUrl: 'https://www.cafeapi.org/',
    websiteLabel: 'Find a cat café near you',
  },
  {
    id: 'e3',
    name: 'Shelter Volunteer Day',
    description: 'Walk dogs, pet cats, be a hero in the least complicated way.',
    date: 'Nov 23, 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Second Chance Shelter',
    image:
      'https://images.pexels.com/photos/7474465/pexels-photo-7474465.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Animals',
    section: 'upcoming',
    websiteUrl: 'https://www.humanesociety.org/',
    websiteLabel: 'Sign up with the Humane Society',
  },
  {
    id: 'e4',
    name: 'Petting Zoo Picnic',
    description: 'Ponies, rabbits, and a blanket under the big oak.',
    date: 'Nov 29, 2026',
    time: '1:00 PM – 4:00 PM',
    location: 'Meadowlark Farm',
    image:
      'https://images.pexels.com/photos/14265077/pexels-photo-14265077.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Animals',
    section: 'upcoming',
    websiteUrl: 'https://www.aza.org/find-a-zoo-aquarium',
    websiteLabel: 'Find a zoo near you',
  },
  {
    id: 'e5',
    name: 'Bunny Cuddle Session',
    description: 'Sit very still and a rabbit will eventually forgive you.',
    date: 'Dec 2, 2026',
    time: '3:00 PM – 5:00 PM',
    location: 'The Quiet Burrow Studio',
    image:
      'https://images.pexels.com/photos/6845650/pexels-photo-6845650.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    category: 'Animals',
    section: 'upcoming',
    websiteUrl: 'https://rabbit.org/',
    websiteLabel: 'Hosted with House Rabbit Society',
  },
];

export const pickMeUpOptions: {
  id: string;
  label: string;
  emoji: string;
  category: FeelGoodCategory;
}[] = [
  { id: 'cute', label: 'Find something cute', emoji: 'star', category: 'Comfort Items' },
  { id: 'animals', label: 'Spend time with animals', emoji: 'heart', category: 'Animals' },
  { id: 'outside', label: 'Get outside', emoji: 'flower', category: 'Outdoor Activities' },
  { id: 'creative', label: 'Try a creative activity', emoji: 'star', category: 'Creative Activities' },
  { id: 'uplifting', label: 'Read something uplifting', emoji: 'heart', category: 'Creative Activities' },
];

const FAV_KEY = 'alibi_favorites_v1';

export interface Favorites {
  products: string[];
  events: string[];
}

export function loadFavorites(): Favorites {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return { products: [], events: [] };
    const parsed = JSON.parse(raw);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
  } catch {
    return { products: [], events: [] };
  }
}

export function saveFavorites(favs: Favorites): boolean {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return true;
  } catch {
    return false;
  }
}
