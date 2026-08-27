// ============================================================
// PROJECTS DATA — Sharif Madber Portfolio
// OWNER INPUT: Add verified project case studies
// ============================================================

import type { Project } from './types';
import { publishedOnly } from './types';

// No projects are published until owner verifies and approves.
// Add entries below once owner supplies verified project data.
const allProjects: Project[] = [
  // Example structure (keep as draft until verified):
  // {
  //   slug: 'kali-linux-usb-wsl',
  //   title: 'Kali Linux USB Hardware Integration via WSL',
  //   category: 'Security Research',
  //   summary: 'OWNER INPUT',
  //   problem: 'OWNER INPUT',
  //   constraints: [],
  //   role: 'OWNER INPUT',
  //   approach: ['OWNER INPUT'],
  //   tools: ['Kali Linux', 'WSL', 'USB passthrough'],
  //   outcomes: ['OWNER INPUT'],
  //   lessons: [],
  //   coverImage: '/assets/images/kali-usb-cover.webp',
  //   publicUrl: undefined,
  //   repositoryUrl: undefined,
  //   status: 'draft',
  //   featured: false,
  // },
];

export const projects = publishedOnly(allProjects);
export const featuredProjects = projects.filter((p) => p.featured);
