// ============================================================
// EXPERIENCE DATA — Sharif Madber Portfolio
// OWNER INPUT: Add verified work experience
// ============================================================
import type { Experience } from './types';
import { publishedOnly } from './types';

const allExperience: Experience[] = [];
// No experience entries published until owner verifies.
export const experience = publishedOnly(allExperience);
