// ============================================================
// SOCIAL LINKS — Sharif Madber Portfolio
// ============================================================
// OWNER INPUT: Add email, GitHub, WhatsApp, Medium once approved

import type { SocialLink } from './types';

const allLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://sa.linkedin.com/in/sharifmadber',
    public: true,
  },
  // OWNER INPUT: Add verified email
  // { platform: 'email', label: 'Email', url: 'mailto:you@example.com', public: true },
  // OWNER INPUT: Add GitHub profile
  // { platform: 'github', label: 'GitHub', url: 'https://github.com/username', public: true },
  // OWNER INPUT: Add Medium profile
  // { platform: 'medium', label: 'Medium', url: 'https://medium.com/@username', public: true },
  // OWNER INPUT: Add WhatsApp contact link
  // { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/...', public: true },
];

export const socialLinks = allLinks.filter((l) => l.public);
