// ============================================================
// SKILLS DATA — Sharif Madber Portfolio
// ============================================================
// OWNER INPUT: Verify skill list before publish

import type { Skill } from './types';
import { publishedOnly } from './types';

const allSkills: Skill[] = [
  {
    id: 'penetration-testing',
    name: 'Penetration Testing',
    category: 'Security',
    plainDescription:
      'Systematically probing systems for security weaknesses using controlled, authorized techniques to identify vulnerabilities before attackers do.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'vulnerability-management',
    name: 'Vulnerability Management',
    category: 'Security',
    plainDescription:
      'Identifying, prioritizing, and remediating security vulnerabilities in systems and infrastructure through structured assessment workflows.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'linux-administration',
    name: 'Linux Administration',
    category: 'Systems',
    plainDescription:
      'Managing Linux servers, shell environments, services, file systems, and user permissions to keep systems stable and secure.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'network-security',
    name: 'Network Security',
    category: 'Security',
    plainDescription:
      'Securing network infrastructure through traffic analysis, firewall configuration, protocol hardening, and intrusion detection.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'kali-linux',
    name: 'Kali Linux',
    category: 'Tools',
    plainDescription:
      'Working with Kali Linux as a professional security assessment platform — tooling, environment setup, and hardware integration.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'virtualization-wsl',
    name: 'Virtualization & WSL',
    category: 'Systems',
    plainDescription:
      'Configuring virtual machines and Windows Subsystem for Linux environments for development, testing, and security workflows.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'server-hosting',
    name: 'Server & Hosting Infrastructure',
    category: 'Infrastructure',
    plainDescription:
      'Deploying and maintaining multi-site web server environments with focus on performance, security, and reliability.',
    relatedProjectSlugs: [],
    status: 'published',
  },
  {
    id: 'cloudflare-nginx',
    name: 'Cloudflare / Nginx Operations',
    category: 'Infrastructure',
    plainDescription:
      'Configuring reverse proxies, CDN rules, security headers, TLS, and traffic routing using Nginx and Cloudflare.',
    relatedProjectSlugs: [],
    status: 'published',
  },
];

export const skills = publishedOnly(allSkills);

export const skillCategories = [...new Set(skills.map((s) => s.category))];
