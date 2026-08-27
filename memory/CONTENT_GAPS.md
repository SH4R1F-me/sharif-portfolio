# CONTENT GAPS — Owner input required before public launch

This file tracks personal information that MUST be verified by Sharif Madber
before the site is published. No sensitive values are stored here.

## REQUIRED before public launch

| Item | Status | Notes |
|---|---|---|
| Final professional title | Using provisional: "Cybersecurity & IT Infrastructure Professional" | Owner must confirm |
| Hero short summary | Using provisional from blueprint | Owner must confirm |
| About biography | Using provisional from blueprint | Owner must confirm or provide final text |
| Public email address | Missing — contact section incomplete | Add to src/data/socials.ts |
| At least 1 verified project | No projects published | Add to src/data/projects.ts |
| Skill list confirmation | Using provisional list from blueprint | Owner must confirm all 8 skills |
| Custom domain | Unknown | Required for canonical URL, sitemap |

## OPTIONAL (recommended)

| Item | Status |
|---|---|
| Professional headshot | Not provided — using SM shield placeholder |
| CV PDF | Not provided — CV button hidden |
| GitHub profile URL | Not provided |
| Medium / writing profile | Not provided |
| WhatsApp contact link | Not provided |
| Work experience | Not provided — Experience section hidden |
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
