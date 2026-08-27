// ============================================================
// WRITING / ARTICLES DATA — Sharif Madber Portfolio
// OWNER INPUT: Add verified published articles
// ============================================================
import type { Article } from './types';
import { publishedOnly } from './types';

const allArticles: Article[] = [];
export const articles = publishedOnly(allArticles);
