export interface Artist {
  slug: string;
  name: string;
  role: string;
  years: string;
  img: string;
  bio: string[];
  specialties: string[];
  works: string[];
  /** L3: optional per-image alt text; falls back to "${name} work ${i+1}" */
  workAlt?: string[];
}

export const ARTISTS: Artist[] = [
  {
    slug: 'marcus-vane',
    name: 'Marcus Vane',
    role: 'Realism & Dark Art',
    years: '11 yrs',
    img: '/artists/marcus.jpg',
    bio: [
      'Marcus Vane has spent over a decade mastering the art of photorealistic tattooing, with a dark, atmospheric edge that sets his work apart. Trained under some of Europe\'s most respected realism artists, he brings a painter\'s eye and a surgeon\'s precision to every session.',
      'His work explores the boundary between light and shadow — portraits, wildlife, and dark fantasy pieces that seem to breathe beneath the skin. Marcus believes a tattoo should feel inevitable, as though it always belonged there.',
      'Based out of Scotland, he has been featured in Inked Magazine, Tattoo Life, and regularly exhibits at international conventions in Berlin, London, and Tokyo.',
    ],
    specialties: ['Photorealism', 'Dark Fantasy', 'Portraits', 'Wildlife', 'Black & Grey'],
    works: [
      '/portfolio/1.jpg',
      '/portfolio/4.jpg',
      '/portfolio/7.jpg',
      '/portfolio/10.jpg',
    ],
  },
  {
    slug: 'sela-orin',
    name: 'Sela Orin',
    role: 'Fine Line & Botanical',
    years: '8 yrs',
    img: '/artists/sela.jpg',
    bio: [
      'Sela Orin discovered tattooing through her background in botanical illustration and printmaking. Her work carries that same delicate precision — hair-thin lines, softly rendered florals, and organic forms that feel like they were drawn directly onto skin with ink and quill.',
      'She is known for her signature approach to negative space, allowing the natural tone of the skin to become part of the composition. Her botanical sleeves and fine-line celestial pieces have earned her a devoted following among clients who value restraint over excess.',
      'Sela completed her apprenticeship in Copenhagen before relocating to Scotland. She speaks fluent Danish, Swedish and English, and takes on international clients by appointment.',
    ],
    specialties: ['Fine Line', 'Botanical', 'Florals', 'Celestial', 'Minimalist'],
    works: [
      '/portfolio/2.jpg',
      '/portfolio/5.jpg',
      '/portfolio/8.jpg',
      '/portfolio/11.jpg',
    ],
  },
  {
    slug: 'theo-blackwood',
    name: 'Theo Blackwood',
    role: 'Geometric & Neo-Trad',
    years: '14 yrs',
    img: '/artists/theo.jpg',
    bio: [
      'With 14 years of experience and two World Tattoo Awards to his name, Theo Blackwood is the studio\'s most senior artist. He came up through the traditional apprenticeship route in San Francisco before developing his signature fusion of sacred geometry and neo-traditional imagery.',
      'Theo\'s pieces are architectural in their precision — mandalas that wrap entire backs, geometric animals rendered with jewel-like colour saturation, and sleeve compositions that read as unified murals. He approaches the body as a three-dimensional canvas, designing pieces that move with the wearer.',
      'He has collaborated with luxury watch brands, streetwear labels, and has tattooed athletes, musicians, and collectors across six continents. His waitlist is currently 8 months long.',
    ],
    specialties: ['Sacred Geometry', 'Neo-Traditional', 'Mandalas', 'Full Sleeves', 'Colour Realism'],
    works: [
      '/portfolio/3.jpg',
      '/portfolio/6.jpg',
      '/portfolio/9.jpg',
      '/portfolio/12.jpg',
    ],
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return ARTISTS.find(a => a.slug === slug);
}
