// The gallery. To add a photo: drop the file in public/Images/ and add one line to the right category below.
//   focus: which part stays in frame when the photo is cropped (x: 0 left → 1 right, y: 0 top → 1 bottom)
//   where: small caption (event · detail)
//   quote: the big line shown on hover and in the full-screen view
// To add a whole new category, add another block to GALLERY; it gets its own tab automatically.

export type GalleryPhoto = { src: string; focus: { x: number; y: number }; where: string; quote: string };
export type GalleryCategory = { id: string; title: string; blurb: string; photos: GalleryPhoto[] };

export const GALLERY: GalleryCategory[] = [
  {
    id: 'hackathons',
    title: 'Hackathons',
    blurb: 'Twenty-four hours, one demo.',
    photos: [
      { src: '/Images/darshil.jpg', focus: { x: 0.66, y: 0.3 }, where: 'Nasiko Hackathon · Microsoft office', quote: "Don't drop the mic." },
      { src: '/Images/deepmind.jpg', focus: { x: 0.45, y: 0.3 }, where: 'Google DeepMind Hackathon', quote: 'Forty tabs. One bug.' },
      { src: '/Images/judges.jpg', focus: { x: 0.21, y: 0.3 }, where: 'HackMan V8 · Final pitch', quote: 'Five minutes. Go.' },
      { src: '/Images/google.jpg', focus: { x: 0.5, y: 0.3 }, where: 'Google Kyoto · Agent Premier League', quote: 'Agents, assemble.' },
    ],
  },
  {
    id: 'presentations',
    title: 'Presentations',
    blurb: 'Research, explained out loud.',
    photos: [
      { src: '/Images/darshil2.jpg', focus: { x: 0.25, y: 0.3 }, where: 'IEEE TENCON 2026 · Poster session', quote: 'Explain it simply.' },
      { src: '/Images/darshil1.jpg', focus: { x: 0.25, y: 0.3 }, where: 'IEEE TENCON 2026 · Q&A', quote: 'Hm. Good question.' },
      { src: '/Images/darshil3.jpg', focus: { x: 0.2, y: 0.3 }, where: 'IEEE TENCON 2026', quote: 'Poster duty.' },
    ],
  },
  {
    id: 'events',
    title: 'Events & visits',
    blurb: 'Rooms worth being in.',
    photos: [
      { src: '/Images/mixer.jpg', focus: { x: 0.65, y: 0.3 }, where: 'Devfolio Student Mixer', quote: 'Ideas, out loud.' },
      { src: '/Images/cisco.jpg', focus: { x: 0.9, y: 0.3 }, where: 'Cisco · Mega Industrial Visit 2026', quote: 'Meet the packets.' },
    ],
  },
];
