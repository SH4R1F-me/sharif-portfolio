// ============================================================
// SHARED TYPES — Sharif Madber Portfolio
// ============================================================

export type PublicationStatus = 'draft' | 'review' | 'published' | 'archived';

export interface SocialLink {
  platform: 'linkedin' | 'email' | 'whatsapp' | 'github' | 'medium' | 'other';
  label: string;
  url: string;
  public: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  plainDescription: string;
  relatedProjectSlugs: string[];
  status: PublicationStatus;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  constraints?: string[];
  role: string;
  approach: string[];
  tools: string[];
  outcomes: string[];
  lessons?: string[];
  coverImage: string;
  gallery?: string[];
  publicUrl?: string;
  repositoryUrl?: string;
  status: PublicationStatus;
  featured: boolean;
}

export interface Experience {
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  bullets: string[];
  status: PublicationStatus;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  image?: string;
  status: PublicationStatus;
}

export interface Article {
  title: string;
  publisher: string;
  publishedAt: string;
  summary: string;
  url: string;
  tags: string[];
  status: PublicationStatus;
}

// ── Content filtering ──
export function isPublished<T extends { status: PublicationStatus }>(item: T): boolean {
  return item.status === 'published';
}

export function publishedOnly<T extends { status: PublicationStatus }>(items: T[]): T[] {
  return items.filter(isPublished);
}
