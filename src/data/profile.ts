// ============================================================
// PROFILE DATA — Sharif Madber Portfolio
// ============================================================
// OWNER INPUT: Update all fields after verification

import type { PublicationStatus } from './types';

export interface Profile {
  name: 'Sharif Madber';
  professionalTitle: string;
  shortSummary: string;
  longBio?: string;
  location?: string;
  availability?: string;
  portrait?: string;
  cvPath?: string;
  status: PublicationStatus;
}

export const profile: Profile = {
  name: 'Sharif Madber',
  professionalTitle: 'Cybersecurity & IT Infrastructure Professional',
  shortSummary:
    'I explore systems, uncover risks, and build practical security solutions across Linux, networks, and modern infrastructure.',
  longBio:
    'I focus on practical cybersecurity, resilient infrastructure, and clear technical problem-solving. My work explores how Linux, networks, virtualization, and security tools can be used to solve real operational challenges.',
  // OWNER INPUT: Confirm location before publish
  location: undefined,
  // OWNER INPUT: Set availability status
  availability: undefined,
  // OWNER INPUT: Add headshot path or leave undefined to show SM shield
  portrait: undefined,
  // OWNER INPUT: Add CV PDF path once approved
  cvPath: undefined,
  status: 'published',
};

export const focusAreas: string[] = [
  'Cybersecurity',
  'Linux Systems',
  'Network & Infrastructure',
];
