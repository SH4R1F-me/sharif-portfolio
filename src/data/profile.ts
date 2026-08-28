// ============================================================
// PROFILE DATA — Sharif Madber Portfolio
// ============================================================
// OWNER INPUT: Update all fields after verification

import type { PublicationStatus } from "./types";

export interface Profile {
  name: "Sharif Madber";
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
  name: "Sharif Madber",
  professionalTitle: "Enterprise Infrastructure & Full-Stack Systems Engineer",
  shortSummary:
    "I design resilient enterprise networks, administer server and storage hardware, and build full-stack systems with an operations-first mindset.",
  longBio:
    "I work across the full technology stack: physical infrastructure, segmented networks, Linux systems, monitoring, and modern application delivery. The goal is always the same—systems that are clear to operate, secure by design, and built to stay online.",
  // OWNER INPUT: Confirm location before publish
  location: undefined,
  // OWNER INPUT: Set availability status
  availability: undefined,
  // OWNER INPUT: Add headshot path or leave undefined to show SM shield
  portrait: undefined,
  // OWNER INPUT: Add CV PDF path once approved
  cvPath: undefined,
  status: "published",
};

export const focusAreas: string[] = [
  "Enterprise Networking",
  "Hardware Administration",
  "Full-Stack Development",
];
