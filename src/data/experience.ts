// Work history shown in the Experience section. Newest first.

export interface Experience {
  role: string;
  company: string;
  period: string;
  year: string;
  type: string;
  summary: string;
  highlights: string[];
  links?: { label: string; url: string; isPlayStore?: boolean }[];
  current?: boolean;
  featured?: boolean;
  /** Runs alongside the other roles instead of in sequence (e.g. freelance). */
  parallel?: boolean;
}

export const experiences: Experience[] = [
  {
    role: 'Part-Time Software Developer',
    company: 'Vina EduTech Pvt. Ltd.',
    period: 'Jul 2026 – Present',
    year: '26',
    type: 'Production',
    current: true,
    featured: true,
    summary:
      'Leading mobile and web development initiatives for flagship products. Shipped Crickraft AMS (web + Android on Play Store), StrengthKraft platform (web + Android on Play Store), and the official Vina EduTech corporate platform.',
    highlights: [
      'Crickraft & StrengthKraft • Dual platform (Web + Play Store)',
      'React Native • Cross-platform mobile development',
      'Professional CI/CD • Code reviews • API routing',
      'Full stack deployment • Cloud infrastructure',
    ],
    links: [
      { label: 'Crickraft Web', url: 'https://crickraft.vinaedutech.com/' },
      { label: 'Crickraft App', url: 'https://play.google.com/store/apps/details?id=com.crickraft.ams', isPlayStore: true },
      { label: 'StrengthKraft Web', url: 'https://strengthkraft.vinaedutech.com/' },
      { label: 'StrengthKraft App', url: 'https://play.google.com/store/apps/details?id=com.vinaedutech.strengthkraft', isPlayStore: true },
    ],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Indian Chess Academy',
    period: 'Jan 2026 – Jun 2026',
    year: '26',
    type: 'Internship',
    featured: true,
    summary:
      'Built and deployed the complete production website for Indian Chess Academy from scratch. Full-stack development including frontend, backend, database design, and cloud deployment.',
    highlights: [
      'Complete website development • Frontend + Backend',
      'Database architecture • Cloud deployment',
      'SEO optimization • Responsive design',
      'Live production deployment',
    ],
    links: [
      { label: 'Indian Chess Academy', url: 'https://indianchessacad.com' },
    ],
  },
  {
    role: 'AI Research Intern',
    company: 'Grep Digital',
    period: 'Oct 2025 – Mar 2026',
    year: '25',
    type: 'Research',
    featured: true,
    summary:
      'Natural language to SQL engines and CCTV video retrieval for Drishti AI. IEEE TENCON 2026 accepted paper.',
    highlights: [
      'NL-to-SQL semantic parser design',
      'CCTV retrieval pipeline • Drishti AI',
      'IEEE TENCON 2026 publication',
    ],
    links: [
      { label: 'IEEE Paper', url: '#achievements' },
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Independent',
    period: '2025 – Present',
    year: '25',
    type: 'Freelance',
    parallel: true,
    current: true,
    summary:
      'Production client websites designed, built and shipped independently, including Velvet Academy.',
    highlights: [
      'Velvet Academy • Full production site',
      'SEO • Responsive • Cloud services',
    ],
    links: [
      { label: 'velvetacademy.org', url: 'https://velvetacademy.org/' },
    ],
  },
];

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Total time worked, as whole months, with overlapping roles counted once.
 * Only roles whose period has a start MONTH ("Jul 2026 – Present") are counted;
 * year-only periods (e.g. "2025 – Present") are skipped because their start is
 * ambiguous. "Present" means today, so the number keeps itself current.
 */
export function totalWorkedMonths(now: Date = new Date()): number {
  const range = /^([A-Za-z]{3})\w*\s+(\d{4})\s*[–-]\s*(?:([A-Za-z]{3})\w*\s+(\d{4})|Present)$/;
  const spans: [number, number][] = [];

  for (const e of experiences) {
    const m = e.period.trim().match(range);
    if (!m) continue;
    const startMonth = MONTHS.indexOf(m[1].toLowerCase());
    if (startMonth < 0) continue;
    const start = new Date(Number(m[2]), startMonth, 1).getTime();
    let end = now.getTime();
    if (m[3]) {
      const endMonth = MONTHS.indexOf(m[3].toLowerCase());
      if (endMonth < 0) continue;
      end = Math.min(end, new Date(Number(m[4]), endMonth + 1, 1).getTime()); // end of that month
    }
    if (end > start) spans.push([start, end]);
  }

  spans.sort((a, b) => a[0] - b[0]);
  let total = 0;
  let curStart = 0;
  let curEnd = 0;
  for (const [s, e] of spans) {
    if (total === 0 && curEnd === 0) {
      curStart = s;
      curEnd = e;
    } else if (s <= curEnd) {
      curEnd = Math.max(curEnd, e);
    } else {
      total += curEnd - curStart;
      curStart = s;
      curEnd = e;
    }
  }
  total += curEnd - curStart;

  return Math.floor(total / (1000 * 60 * 60 * 24 * 30.4375));
}
