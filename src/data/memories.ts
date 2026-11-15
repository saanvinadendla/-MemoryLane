export interface Memory {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
  alt: string;
  accent: 'lavender' | 'blush' | 'coral' | 'butter';
  tilt: 1 | 2 | 3 | 4;
  span: 'tall' | 'wide' | 'regular';
  emojiTag: string;
}

export const memories: Memory[] = [
  {
    id: 'picnic',
    title: 'Sunday Picnic',
    date: 'October 12, 2026',
    caption: 'Anna brought lemon bars. We stayed until the candles burned out.',
    image:
      'https://images.pexels.com/photos/20424752/pexels-photo-20424752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Two friends laughing on a picnic blanket in the sun',
    accent: 'butter',
    tilt: 1,
    span: 'tall',
    emojiTag: 'Golden Hour',
  },
  {
    id: 'coffee',
    title: 'Slow Mornings',
    date: 'September 3, 2026',
    caption: 'The window seat, a warm mug, nowhere to be.',
    image:
      'https://images.pexels.com/photos/10069250/pexels-photo-10069250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A woman with coffee by a sunlit window',
    accent: 'coral',
    tilt: 2,
    span: 'wide',
    emojiTag: 'Quiet',
  },
  {
    id: 'beach',
    title: 'Sayulita, Mexico',
    date: 'August 21, 2026',
    caption: 'We ran into the water fully clothed. Worth it.',
    image:
      'https://images.pexels.com/photos/18427233/pexels-photo-18427233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Silhouettes on a beach at sunset in Sayulita',
    accent: 'coral',
    tilt: 3,
    span: 'tall',
    emojiTag: 'Adventure',
  },
  {
    id: 'birthday',
    title: 'Maya Turns 28',
    date: 'July 8, 2026',
    caption: 'She blew out the candles twice, just for luck.',
    image:
      'https://images.pexels.com/photos/10165858/pexels-photo-10165858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Friends celebrating a birthday with a candle-lit cake',
    accent: 'blush',
    tilt: 1,
    span: 'regular',
    emojiTag: 'Celebrate',
  },
  {
    id: 'puppies',
    title: 'The Boys Met Us at the Park',
    date: 'June 14, 2026',
    caption: 'Biscuit and Moe. Mostly mud, entirely joy.',
    image:
      'https://images.pexels.com/photos/29439897/pexels-photo-29439897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Two puppies playing on green grass',
    accent: 'butter',
    tilt: 2,
    span: 'regular',
    emojiTag: 'Joy',
  },
  {
    id: 'friends',
    title: "Everyone Together",
    date: 'May 30, 2026',
    caption: 'Six years of friendship, one very crowded hammock.',
    image:
      'https://images.pexels.com/photos/35620788/pexels-photo-35620788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Three friends smiling and embracing outdoors',
    accent: 'lavender',
    tilt: 4,
    span: 'regular',
    emojiTag: 'Together',
  },
];
