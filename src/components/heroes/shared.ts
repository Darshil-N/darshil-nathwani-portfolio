// Shared bits for the three hero prototypes (/hero1, /hero2, /hero3).
import { sound } from '../../lib/sound';

export const LIME = '#A3E635';
export const INK = '#0C0C0E';
export const E = [0.76, 0, 0.24, 1] as const;
export const MONO = "'JetBrains Mono', monospace";
export const DISPLAY = "'Inter Tight', sans-serif";
export const SERIF = "'DM Serif Display', serif";
export const EMAIL = 'darshilnathwani@gmail.com';

/** Each photo carries one piece of proof: a white line and a lime line. */
export const PROOF = [
  { src: '/Images/judges.jpg', pos: '21% 30%', a: 'Pitched it in', b: 'five minutes.', sub: 'HackMan V8 · Pitching to the judges' },
  { src: '/Images/darshil2.jpg', pos: '25% 30%', a: 'Published at', b: 'IEEE TENCON.', sub: 'IEEE TENCON 2026 · Poster session' },
  { src: '/Images/deepmind.jpg', pos: '45% 30%', a: 'Hacked with', b: 'Google DeepMind.', sub: 'Google DeepMind Hackathon' },
  { src: '/Images/darshil.jpg', pos: '66% 30%', a: 'Shipped under', b: 'pressure.', sub: 'Nasiko Hackathon · Microsoft office' },
  { src: '/Images/google.jpg', pos: '50% 30%', a: 'Built agents', b: 'at Google.', sub: 'Google Kyoto · Agent Premier League' },
  { src: '/Images/cisco.jpg', pos: '90% 30%', a: 'Followed the', b: 'packets.', sub: 'Cisco · Mega Industrial Visit 2026' },
];

export function copyEmail() {
  navigator.clipboard?.writeText(EMAIL);
  sound.playChime?.();
}

export function downloadResume() {
  sound.playChime?.();
  const a = document.createElement('a');
  a.href = '/resume/Minimalist White and Grey Professional Resume.pdf';
  a.download = 'Darshil_Nathwani_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
