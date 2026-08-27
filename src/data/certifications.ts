// ============================================================
// CERTIFICATIONS DATA — Sharif Madber Portfolio
// OWNER INPUT: Add verified certifications
// ============================================================
import type { Certification } from './types';
import { publishedOnly } from './types';

const allCertifications: Certification[] = [];
export const certifications = publishedOnly(allCertifications);
