# Resume Builder - Project Plan

> **Domain:** resume.kpruthvi.com
> **Repo:** https://github.com/pruthvi2805/resume
> **Status:** Phase 1 Complete - Ready for Phase 2
> **Last Updated:** 2026-01-21

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Differentiators](#differentiators)
3. [User Experience](#user-experience)
4. [Design System](#design-system)
5. [Tech Stack](#tech-stack)
6. [Templates](#templates)
7. [Form Sections](#form-sections)
8. [Features](#features)
9. [Project Structure](#project-structure)
10. [Build Phases](#build-phases)
11. [Progress Log](#progress-log)

---

## Project Vision

### The Problem
Most resume builders either:
- Require signup/accounts (privacy concern)
- Have freemium paywalls and watermarks
- Create "pretty" resumes that fail ATS (Applicant Tracking Systems)
- Lock user data in their platform

### Our Solution
A 100% client-side, privacy-first resume builder that focuses on creating ATS-optimized resumes that actually reach human recruiters.

### Tagline
> "Resumes that get past the robots."

### Target Audience
- Job seekers (developers and non-developers)
- Professionals updating their resume
- Users of Portfolio Builder (companion tool)

---

## Differentiators

| Feature | Description | Priority |
|---------|-------------|----------|
| **100% Private** | No account, no server, data never leaves browser. All processing client-side. | Must Have |
| **ATS-First Design** | Templates designed to pass ATS parsers, not just look pretty. | Must Have |
| **ATS Preview** | Toggle to see resume as plain text (how ATS systems see it). | Must Have |
| **ATS Score** | Real-time score showing how ATS-friendly the resume is. | Must Have |
| **Job Description Matcher** | Paste a job description, see match %, get keyword suggestions. | Must Have |
| **Portfolio Builder Sync** | Import data from Portfolio Builder if user has used it before. | Nice to Have |

---

## User Experience

### Landing Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Resume Builder                    [Theme] [GitHub]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         Resumes that get past the robots.                   │
│                                                             │
│    Most builders make pretty PDFs that fail ATS systems.    │
│    We make clean resumes that actually reach humans.        │
│                                                             │
│    ┌─────────────────┐  ┌─────────────────────────────┐    │
│    │  Start Fresh    │  │  Import from Portfolio      │    │
│    └─────────────────┘  │  Builder                    │    │
│                         └─────────────────────────────┘    │
│                                                             │
│    ✓ No signup    ✓ No watermarks    ✓ 100% private        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     Why ATS Matters                         │
│   "75% of resumes are rejected by ATS before a human        │
│    ever sees them"                                          │
├─────────────────────────────────────────────────────────────┤
│  Footer: © 2026 Pruthvi Kauticwar · kpruthvi.com · Privacy  │
└─────────────────────────────────────────────────────────────┘
```

### Builder Interface

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo] Resume Builder              [ATS Score: 85/100]  [Download] │
├───────────────────┬─────────────────────────────────────────────────┤
│                   │                                                 │
│  SECTIONS         │              LIVE PREVIEW                       │
│                   │  ┌───────────────────────────────────────────┐  │
│  ○ Personal Info  │  │                                           │  │
│  ○ Summary        │  │           JOHN DOE                        │  │
│  ○ Experience     │  │  john@email.com · Amsterdam · LinkedIn    │  │
│  ○ Education      │  │                                           │  │
│  ○ Skills         │  │  EXPERIENCE                               │  │
│  ○ Certifications │  │  ─────────────────────────────            │  │
│  ○ Projects       │  │  Senior Developer                         │  │
│                   │  │  Acme Corp · 2022-Present                 │  │
│  ───────────────  │  │  • Built scalable systems...              │  │
│                   │  │                                           │  │
│  TEMPLATES        │  └───────────────────────────────────────────┘  │
│  [1] [2] [3] [4]  │                                                 │
│                   │  [Normal View]  [ATS View]                      │
│  ───────────────  │                                                 │
│                   ├─────────────────────────────────────────────────┤
│  JOB MATCHER      │  JOB MATCH PANEL (expandable)                   │
│  [Paste JD...]    │  Match: 72% | Missing: Kubernetes, CI/CD       │
│                   │  [+ Add suggested keywords]                     │
└───────────────────┴─────────────────────────────────────────────────┘
```

### User Flow

1. **Land** → User arrives at landing page
2. **Choose** → Start fresh OR import from Portfolio Builder
3. **Fill** → Complete form sections (personal, experience, education, etc.)
4. **Preview** → See live preview update as they type
5. **Optimize** → Check ATS score, use job matcher to improve
6. **Template** → Choose from 4 ATS-friendly templates
7. **Download** → Export as PDF (no watermark, no signup)

---

## Design System

### Philosophy
Professional + Minimal Premium - matches Portfolio Builder family while feeling high-end and trustworthy.

### Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--bg-primary` | #FAFAF8 | #1A1A1A | Page background |
| `--bg-surface` | #FFFFFF | #252525 | Cards, panels |
| `--bg-hover` | #F5F5F3 | #333333 | Hover states |
| `--border` | #E5E5E3 | #333333 | Borders |
| `--text-primary` | #1A1A1A | #FAFAF8 | Main text |
| `--text-secondary` | #666666 | #A0A0A0 | Secondary text |
| `--text-muted` | #999999 | #666666 | Muted text |
| `--accent` | #22c55e | #4ade80 | Primary accent (green) |
| `--accent-hover` | #16a34a | #22c55e | Accent hover |
| `--error` | #ef4444 | #f87171 | Error states |
| `--warning` | #f59e0b | #fbbf24 | Warning states |
| `--success` | #22c55e | #4ade80 | Success states |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Inter | 600 | 24-32px |
| Body | Inter | 400 | 14-16px |
| Labels | Inter | 500 | 12-14px |
| Buttons | Inter | 500 | 14px |

### Spacing
- Base unit: 4px
- Common values: 4, 8, 12, 16, 24, 32, 48, 64

### Border Radius
- Small: 4px (inputs, small buttons)
- Medium: 6px (cards, panels)
- Large: 8px (modals, large containers)

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| **Framework** | React 18 | Reactivity for live preview, component architecture |
| **Build Tool** | Vite | Fast builds, modern tooling, static output |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Fast development, consistent with Text Lab |
| **State** | Zustand | Lightweight, simple, already used in other projects |
| **PDF Generation** | react-pdf or jsPDF | Client-side PDF creation |
| **Deployment** | Cloudflare Pages | Consistent with other sites |
| **Storage** | localStorage | Save drafts, no server needed |

### Why Not Next.js?
Resume Builder is essentially a single-page app. No routing needed, no SSR needed. Vite + React is lighter and sufficient.

### Why Not Vanilla JS?
Live preview with multiple templates would get messy. React's reactivity makes this much cleaner and maintainable.

---

## Templates

All templates are ATS-optimized with:
- Standard fonts (Arial, Calibri, Georgia)
- No graphics/icons in parseable areas
- Clear section headers
- Standard date formats
- Single or simple two-column layouts

### Template 1: Classic
- Single column
- Traditional serif option
- Best for: Conservative industries (finance, law, government)

### Template 2: Modern
- Single column
- Clean sans-serif
- Subtle accent color on headers
- Best for: Tech, startups, creative roles

### Template 3: Minimal
- Maximum whitespace
- Very clean, refined
- Best for: Design roles, senior positions

### Template 4: Compact
- Two-column (ATS-safe layout)
- Space-efficient
- Best for: Experienced professionals with lots of content

---

## Form Sections

### 1. Personal Info
| Field | Required | Notes |
|-------|----------|-------|
| Full Name | Yes | |
| Email | Yes | |
| Phone | No | |
| Location | No | City, Country format |
| LinkedIn URL | No | |
| Portfolio URL | No | Auto-fill if imported from Portfolio Builder |

### 2. Professional Summary
| Field | Required | Notes |
|-------|----------|-------|
| Summary | No | 2-3 sentences, 200-300 chars recommended |

### 3. Work Experience (Repeatable)
| Field | Required | Notes |
|-------|----------|-------|
| Job Title | Yes | |
| Company | Yes | |
| Location | No | |
| Start Date | Yes | Month/Year picker |
| End Date | No | Month/Year or "Present" checkbox |
| Bullet Points | Yes | 3-5 recommended, rich text |

### 4. Education (Repeatable)
| Field | Required | Notes |
|-------|----------|-------|
| Degree | Yes | |
| Institution | Yes | |
| Year | No | Graduation year |
| Achievements | No | Optional honors, GPA, etc. |

### 5. Skills
| Field | Required | Notes |
|-------|----------|-------|
| Skills | No | Comma-separated, categorized display |

### 6. Certifications (Repeatable, Optional Section)
| Field | Required | Notes |
|-------|----------|-------|
| Certification Name | Yes | |
| Issuer | No | |
| Year | No | |

### 7. Projects (Repeatable, Optional Section)
| Field | Required | Notes |
|-------|----------|-------|
| Project Name | Yes | |
| Description | No | Brief description |
| Link | No | URL to project |

---

## Features

### Core Features (MVP)

#### Live Preview
- Updates in real-time as user types
- Shows selected template
- Scrollable if content exceeds one page

#### Template Switcher
- 4 template thumbnails in sidebar
- Click to switch, preview updates instantly
- Persist selection in localStorage

#### ATS Score
- Display score 0-100 in header
- Click for detailed breakdown
- Scoring factors:
  - Standard fonts used
  - No problematic formatting
  - Clear section headers
  - Contact info present
  - Proper date formats
  - Sufficient content length

#### ATS View Toggle
- Button to switch between "Normal View" and "ATS View"
- ATS View shows plain text version (how parsers see it)
- Helps users understand what ATS systems extract

#### Job Description Matcher
- Expandable panel in sidebar
- Paste job description text
- Algorithm extracts keywords
- Shows match percentage
- Lists found vs missing keywords
- "Add suggested keywords" helper

#### PDF Export
- Single click download
- No watermark
- Filename: `{Name}_Resume.pdf`
- Clean, print-ready output

#### Auto-Save
- Save to localStorage on every change
- Restore on page revisit
- Clear option available

#### Dark/Light Mode
- Toggle in header
- Persist preference
- Uses `kp-theme` localStorage key (consistent with other sites)

### Future Features (Post-MVP)
- [ ] Portfolio Builder import
- [ ] Multiple resume versions
- [ ] Cover letter builder
- [ ] LinkedIn import (paste profile text)
- [ ] Export to DOCX
- [ ] Print-friendly view

---

## Project Structure

```
resume/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Container.tsx
│   │   ├── landing/               # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── CTA.tsx
│   │   ├── forms/                 # Form section components
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── SummaryForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── CertificationsForm.tsx
│   │   │   └── ProjectsForm.tsx
│   │   ├── preview/               # Resume preview components
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── ATSPreview.tsx
│   │   │   └── PreviewToggle.tsx
│   │   ├── templates/             # Resume template components
│   │   │   ├── TemplateClassic.tsx
│   │   │   ├── TemplateModern.tsx
│   │   │   ├── TemplateMinimal.tsx
│   │   │   ├── TemplateCompact.tsx
│   │   │   └── TemplateSwitcher.tsx
│   │   └── ats/                   # ATS features
│   │       ├── ATSScore.tsx
│   │       ├── ATSScoreBreakdown.tsx
│   │       └── JobMatcher.tsx
│   ├── pages/                     # Page components
│   │   ├── LandingPage.tsx
│   │   ├── BuilderPage.tsx
│   │   └── PrivacyPage.tsx
│   ├── stores/                    # Zustand stores
│   │   ├── resumeStore.ts         # Resume data state
│   │   ├── uiStore.ts             # UI state (template, view mode)
│   │   └── themeStore.ts          # Theme state
│   ├── utils/                     # Utility functions
│   │   ├── pdfGenerator.ts        # PDF export logic
│   │   ├── atsScorer.ts           # ATS scoring algorithm
│   │   ├── keywordExtractor.ts    # Job description keyword extraction
│   │   ├── storage.ts             # localStorage helpers
│   │   └── validators.ts          # Form validation
│   ├── types/                     # TypeScript types
│   │   ├── resume.ts              # Resume data types
│   │   └── index.ts
│   ├── styles/                    # Global styles
│   │   └── globals.css            # Tailwind imports, CSS variables
│   ├── App.tsx                    # Main app component with routing
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── README.md
└── PLAN.md                        # This file
```

---

## Build Phases

### Phase 1: Project Setup ✅
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS
- [x] Set up project structure (folders)
- [x] Create base CSS variables (colors, typography)
- [x] Set up Zustand stores (resume, UI, theme)
- [x] Create basic TypeScript types
- [x] Add .gitignore, README.md
- [x] Initial commit and push

### Phase 2: Landing Page
- [ ] Create Header component (logo, theme toggle, GitHub link)
- [ ] Create Hero section
- [ ] Create Features section (why ATS matters)
- [ ] Create Footer component
- [ ] Add "Start Fresh" and "Import" buttons (import disabled for MVP)
- [ ] Responsive design
- [ ] Dark/light mode support

### Phase 3: Builder Layout
- [ ] Create builder page layout (sidebar + preview)
- [ ] Create section navigation in sidebar
- [ ] Create template switcher in sidebar
- [ ] Create job matcher placeholder in sidebar
- [ ] Create preview area with scroll
- [ ] Create header with ATS score and download button
- [ ] Responsive design (stack on mobile)

### Phase 4: Form Components
- [ ] Create reusable Input, Textarea, Select components
- [ ] Create PersonalInfoForm
- [ ] Create SummaryForm
- [ ] Create ExperienceForm (with add/remove entries)
- [ ] Create EducationForm (with add/remove entries)
- [ ] Create SkillsForm
- [ ] Create CertificationsForm (optional section)
- [ ] Create ProjectsForm (optional section)
- [ ] Wire forms to Zustand store
- [ ] Add form validation

### Phase 5: Resume Templates
- [ ] Create TemplateClassic
- [ ] Create TemplateModern
- [ ] Create TemplateMinimal
- [ ] Create TemplateCompact
- [ ] Create TemplateSwitcher component
- [ ] Wire template selection to store
- [ ] Ensure all templates are ATS-friendly

### Phase 6: Live Preview
- [ ] Create ResumePreview component
- [ ] Connect preview to Zustand store
- [ ] Implement real-time updates
- [ ] Add preview scrolling
- [ ] Create ATSPreview (plain text view)
- [ ] Create PreviewToggle (Normal/ATS view switch)

### Phase 7: ATS Features
- [ ] Implement ATS scoring algorithm
- [ ] Create ATSScore component (header badge)
- [ ] Create ATSScoreBreakdown (detailed view)
- [ ] Implement keyword extraction from job descriptions
- [ ] Create JobMatcher component
- [ ] Show match percentage and missing keywords
- [ ] "Add keyword" suggestions

### Phase 8: PDF Export
- [ ] Set up react-pdf or jsPDF
- [ ] Create PDF generation for each template
- [ ] Implement download functionality
- [ ] Test print quality
- [ ] Verify ATS parsability of generated PDF

### Phase 9: Polish & Persistence
- [ ] Implement localStorage save/restore
- [ ] Add auto-save on changes
- [ ] Add "Clear all" option
- [ ] Add loading states
- [ ] Add error handling
- [ ] Accessibility audit (keyboard nav, ARIA)
- [ ] Performance optimization

### Phase 10: SEO & Deployment
- [ ] Add meta tags
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Create Privacy page
- [ ] Set up GitHub Actions for Cloudflare Pages
- [ ] Configure custom domain (resume.kpruthvi.com)
- [ ] Add to Hub (kpruthvi.com)
- [ ] Final testing

---

## Progress Log

### 2026-01-21
- [x] Project concept finalized
- [x] Differentiators defined (Privacy, ATS-first, Job Matcher, ATS Preview)
- [x] User experience mapped out
- [x] Design system defined (Professional + Minimal Premium)
- [x] Tech stack chosen (Vite + React + TypeScript + Tailwind)
- [x] Templates defined (4 ATS-friendly templates)
- [x] Form sections defined
- [x] Features prioritized (MVP vs Future)
- [x] Project structure planned
- [x] Build phases outlined
- [x] Repository created: https://github.com/pruthvi2805/resume
- [x] PLAN.md created
- [x] **Phase 1 Complete:**
  - Vite + React + TypeScript initialized
  - Tailwind CSS configured
  - Project structure created (components, stores, types, utils, pages)
  - Design system CSS variables defined (light/dark themes)
  - Zustand stores created (resumeStore, uiStore, themeStore)
  - TypeScript types defined (ResumeData, templates, ATS types)
  - README.md and .gitignore finalized

### Next Steps
- Start Phase 2: Landing Page

---

## Notes & Decisions

### Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-01-21 | Domain: resume.kpruthvi.com | Short, clean, memorable |
| 2026-01-21 | Stack: Vite + React (not Next.js) | SPA doesn't need SSR/routing complexity |
| 2026-01-21 | Stack: Vite + React (not Vanilla) | Live preview needs reactivity |
| 2026-01-21 | 4 templates (not more) | Quality over quantity, all ATS-safe |
| 2026-01-21 | No JSON export | User preference |
| 2026-01-21 | Green accent (#22c55e) | Brand consistency across all sites |

### Open Questions
- None currently

### Parking Lot (Future Ideas)
- Portfolio Builder import
- Cover letter builder
- Multiple saved versions
- LinkedIn profile import
- DOCX export

---

*This document is the source of truth for the Resume Builder project. Update it as decisions are made and progress is achieved.*
