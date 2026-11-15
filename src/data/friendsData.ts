export interface Friend {
  id: string;
  name: string;
  avatar: string;
  accent: 'lavender' | 'blush' | 'coral' | 'butter';
  mutualNote: string;
}

export interface FriendComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export interface FriendStory {
  id: string;
  friendId: string;
  title: string;
  date: string;
  caption: string;
  cover: string;
  pages: { image: string; alt: string; note: string }[];
  tag: string;
  accent: 'lavender' | 'blush' | 'coral' | 'butter';
}

export interface SharedMemory {
  id: string;
  friendId: string;
  photo: string;
  alt: string;
  caption: string;
  date: string;
}

export const friends: Friend[] = [
  {
    id: 'maya',
    name: 'Maya Torres',
    avatar:
      'https://images.pexels.com/photos/3936894/pexels-photo-3936894.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'blush',
    mutualNote: '12 shared memories',
  },
  {
    id: 'leo',
    name: 'Leo Marchetti',
    avatar:
      'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'butter',
    mutualNote: '8 shared memories',
  },
  {
    id: 'june',
    name: 'June Okafor',
    avatar:
      'https://images.pexels.com/photos/6497114/pexels-photo-6497114.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'lavender',
    mutualNote: '15 shared memories',
  },
  {
    id: 'sam',
    name: 'Sam Whitfield',
    avatar:
      'https://images.pexels.com/photos/33815738/pexels-photo-33815738.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'coral',
    mutualNote: '5 shared memories',
  },
  {
    id: 'ana',
    name: 'Ana Beltrán',
    avatar:
      'https://images.pexels.com/photos/17888489/pexels-photo-17888489.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'butter',
    mutualNote: '9 shared memories',
  },
  {
    id: 'theo',
    name: 'Theo Nakamura',
    avatar:
      'https://images.pexels.com/photos/20782648/pexels-photo-20782648.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    accent: 'lavender',
    mutualNote: '3 shared memories',
  },
];

export const friendStories: FriendStory[] = [
  {
    id: 'sierra-hike',
    friendId: 'maya',
    title: 'Sunrise on the Sierra Trail',
    date: 'November 2, 2026',
    caption:
      'Maya dragged us out of bed at 4am. She was right, as usual — the light was unreal.',
    cover:
      'https://images.pexels.com/photos/5430693/pexels-photo-5430693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Adventure',
    accent: 'coral',
    pages: [
      {
        image:
          'https://images.pexels.com/photos/12217361/pexels-photo-12217361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Hikers ascending a rugged mountain trail at sunrise',
        note: 'Page 1 — still dark, coffee in a thermos, everyone pretending to be awake.',
      },
      {
        image:
          'https://images.pexels.com/photos/35919548/pexels-photo-35919548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Silhouette of a hiker enjoying a sunrise view',
        note: 'Page 2 — we reached the ridge just as the sun did. Nobody said anything for a while.',
      },
      {
        image:
          'https://images.pexels.com/photos/13328037/pexels-photo-13328037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Two hikers on a mountain trail surrounded by dramatic clouds',
        note: 'Page 3 — the walk back down, tired legs and all, was somehow the best part.',
      },
    ],
  },
  {
    id: 'sourdough-week',
    friendId: 'june',
    title: 'Sourdough, Attempt No. 7',
    date: 'October 19, 2026',
    caption:
      'June finally cracked her grandmother’s recipe. The kitchen smelled like a bakery for a week.',
    cover:
      'https://images.pexels.com/photos/8653695/pexels-photo-8653695.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Cozy',
    accent: 'butter',
    pages: [
      {
        image:
          'https://images.pexels.com/photos/7966415/pexels-photo-7966415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Hands holding a tray with freshly baked bread',
        note: 'Page 1 — the first loaf that actually rose. There was screaming.',
      },
      {
        image:
          'https://images.pexels.com/photos/2932683/pexels-photo-2932683.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Bread in a wicker basket next to a green plant',
        note: 'Page 2 — by loaf four she was giving them away to the whole street.',
      },
      {
        image:
          'https://images.pexels.com/photos/6000692/pexels-photo-6000692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Freshly baked rustic bread on a wooden counter',
        note: 'Page 3 — the recipe card, in her grandmother’s handwriting, now framed.',
      },
    ],
  },
  {
    id: 'garden-days',
    friendId: 'leo',
    title: 'The Tomato Situation',
    date: 'September 8, 2026',
    caption:
      'Leo planted six tomato plants for two people. This is what happened next.',
    cover:
      'https://images.pexels.com/photos/27177893/pexels-photo-27177893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'At Home',
    accent: 'butter',
    pages: [
      {
        image:
          'https://images.pexels.com/photos/27177895/pexels-photo-27177895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Hands holding freshly harvested cherry tomatoes',
        note: 'Page 1 — August: “they’re coming along nicely.” Famous last words.',
      },
      {
        image:
          'https://images.pexels.com/photos/4894618/pexels-photo-4894618.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'A person holding fresh radishes and gardening tools',
        note: 'Page 2 — the radishes did fine too, for the record.',
      },
      {
        image:
          'https://images.pexels.com/photos/5479392/pexels-photo-5479392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'A woman holding freshly harvested vegetables in a greenhouse',
        note: 'Page 3 — his mom came over and left with two full grocery bags of tomatoes.',
      },
    ],
  },
  {
    id: 'vinyl-nights',
    friendId: 'sam',
    title: 'Friday Night Records',
    date: 'August 30, 2026',
    caption:
      'Every few weeks Sam opens the good bottles and the good records. Volume rules apply.',
    cover:
      'https://images.pexels.com/photos/36767607/pexels-photo-36767607.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Tradition',
    accent: 'lavender',
    pages: [
      {
        image:
          'https://images.pexels.com/photos/9050184/pexels-photo-9050184.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Two people exploring vinyl records beside a turntable',
        note: 'Page 1 — the ritual: everyone picks one, no skipping, no arguing.',
      },
      {
        image:
          'https://images.pexels.com/photos/11626772/pexels-photo-11626772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'A woman listening to music on headphones near a record collection',
        note: 'Page 2 — Ana always goes last and always picks something unexpected.',
      },
      {
        image:
          'https://images.pexels.com/photos/6866725/pexels-photo-6866725.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Top view of a vintage turntable on a wooden table',
        note: 'Page 3 — his dad’s turntable, still going. That’s the whole point, really.',
      },
    ],
  },
];

export const sharedMemories: SharedMemory[] = [
  {
    id: 'sm-1',
    friendId: 'maya',
    photo:
      'https://images.pexels.com/photos/20424752/pexels-photo-20424752.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    alt: 'Two friends laughing on a picnic blanket',
    caption: 'The October picnic — you brought the lemon bars.',
    date: 'Oct 12',
  },
  {
    id: 'sm-2',
    friendId: 'june',
    photo:
      'https://images.pexels.com/photos/10165858/pexels-photo-10165858.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    alt: 'Friends celebrating a birthday with a candle-lit cake',
    caption: 'Your 29th. She blew out the candles twice for luck.',
    date: 'Jul 8',
  },
  {
    id: 'sm-3',
    friendId: 'leo',
    photo:
      'https://images.pexels.com/photos/18427233/pexels-photo-18427233.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    alt: 'Silhouettes on Sayulita beach at sunset',
    caption: 'Sayulita, fully clothed into the water. Worth it.',
    date: 'Aug 21',
  },
  {
    id: 'sm-4',
    friendId: 'sam',
    photo:
      'https://images.pexels.com/photos/29439897/pexels-photo-29439897.jpeg?auto=compress&cs=tinysrgb&h=500&w=500',
    alt: 'Two puppies playing on green grass',
    caption: 'Biscuit and Moe met at the park. Mostly mud.',
    date: 'Jun 14',
  },
];

export const initialComments: Record<string, FriendComment[]> = {
  'sierra-hike': [
    {
      id: 'c1',
      author: 'June Okafor',
      avatar:
        'https://images.pexels.com/photos/6497114/pexels-photo-6497114.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      text: 'That second photo belongs in a frame. I’m still not over the 4am start though.',
      date: 'Nov 3',
    },
  ],
  'sourdough-week': [
    {
      id: 'c2',
      author: 'Leo Marchetti',
      avatar:
        'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      text: 'I can confirm loaf four changed my life. Please adopt me.',
      date: 'Oct 20',
    },
  ],
  'garden-days': [
    {
      id: 'c3',
      author: 'Maya Torres',
      avatar:
        'https://images.pexels.com/photos/3936894/pexels-photo-3936894.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      text: 'The tomato situation is out of control and I love it. Salsa when?',
      date: 'Sep 9',
    },
  ],
  'vinyl-nights': [
    {
      id: 'c4',
      author: 'Ana Beltrán',
      avatar:
        'https://images.pexels.com/photos/17888489/pexels-photo-17888489.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      text: 'Next time I’m bringing the Tango record and nobody can stop me.',
      date: 'Aug 31',
    },
  ],
};

export const myStoriesToShare = [
  { id: 'picnic', title: 'Sunday Picnic' },
  { id: 'coffee', title: 'Slow Mornings' },
  { id: 'beach', title: 'Sayulita, Mexico' },
  { id: 'birthday', title: 'Maya Turns 28' },
  { id: 'puppies', title: 'The Boys Met Us at the Park' },
  { id: 'friends', title: 'Everyone Together' },
];
