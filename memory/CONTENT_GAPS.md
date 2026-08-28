# CONTENT GAPS — Owner input required before public launch

This file tracks personal information that MUST be verified by Sharif Madber
before the site is published. No sensitive values are stored here.

## REQUIRED before public launch

| Item | Status | Notes |
|---|---|---|
| Final professional title | Confirmed from owner CV | Published as "Network Engineer & Cybersecurity Practitioner" |
| Hero short summary | Confirmed from owner CV | Rewritten and published |
| About biography | Confirmed from owner CV | Rewritten and published |
| Public email address | Missing — contact section incomplete | Add to src/data/socials.ts |
| At least 1 verified project | Complete | Noorix Stream and institutional network simulation published |
| Skill list confirmation | Complete | Four-domain capability matrix published |
| Custom domain | Unknown | Required for canonical URL, sitemap |

## OPTIONAL (recommended)

| Item | Status |
|---|---|
| Professional headshot | Not provided — using SM shield placeholder |
| CV PDF | Not provided — CV button hidden |
| GitHub profile URL | Not provided |
| Medium / writing profile | Added |
| WhatsApp contact link | Not provided |
| Work experience | Added — Makkah, Amber IT, and Global Communication |
| Education details | Not provided |
| Certifications | Not provided — section hidden |
| Project screenshots / repos | Not provided |
| Testimonials | Not provided |
| Verified social preview photo | Not provided |

## How to add content

1. Open the relevant file in `src/data/`
2. Follow the TypeScript interface (see `src/data/types.ts`)
3. Set `status: 'draft'` while working
4. Test with `npm run build`
5. Change to `status: 'published'` only after owner approves

## Sections that auto-hide when no data

- Projects section: hidden if no `published` projects
- Experience section: hidden if no `published` experience  
- Writing section: hidden if no `published` articles
- Certifications: hidden if no `published` certifications
- CV button: hidden if no `cvPath` in profile
