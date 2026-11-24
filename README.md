# m-veer.github.io

Personal portfolio of **Mayur Veer**, a software engineer focused on backend, distributed systems, and cloud infrastructure. I'm completing an MS in Software Engineering Systems at Northeastern University (graduating December 2026) and am open to full-time software engineering roles from January 2027.

**Live site:** https://m-veer.github.io/ · **Resume:** [assets/resume/Mayur-Veer-Resume.pdf](assets/resume/Mayur-Veer-Resume.pdf)

## Sections

| Section | What it shows |
|---|---|
| Intro | A short pitch, with versions for recruiters, tech leads, backend and frontend developers, and software architects |
| Work | Projects, newest and strongest first (see below) |
| Values | Core engineering values |
| Background | Experience: Cybersenz, EY, and earlier internships |
| References | Recommendations from managers and teammates |
| About | Bio, skills, and certificates |
| Contact | Availability, resume download, email, LinkedIn, and GitHub |

### Featured projects

- **Self-Hosted PaaS with Raft-Based Distributed Scheduler** (Go, PostgreSQL, Kubernetes, Terraform, AWS EKS): `git push` goes live in 23 s; the scheduler has Raft leader election written from scratch and lost 0 of 32,352 jobs across 87 injected faults.
- **Real-Time Collaborative Code Review Platform** (Rust, Python, React, Redis, AWS EKS): a Rust CRDT server handles 2,200 concurrent connections per 0.5-CPU pod at p99 under 200 ms, with zero lost edits during autoscaling.
- **Multi-Tenant Serverless Log Pipeline** (Python, AWS Lambda, SQS, DynamoDB, Terraform): 6,000 requests/min at 84 ms p95, zero lost messages, and $0 cost when idle.
- **Healthcare Operations Automation Platform** (Cybersenz): LLM agents, an AI phone agent, and voicemail and fax pipelines that automate a clinic's patient intake.

## Features

- **Language and theme slider.** Position 0 is the default black English page. Each of the other 10 positions switches to a spoken language, recolors the page in that country's flag colors, and restyles the menu and intro in a paired programming language: English/Python, Hindi/JavaScript, Marathi/Shell, Arabic/Go (right-to-left), French/Java, Japanese/Rust, Spanish/SQL, Italian/HTML, Chinese/HCL, and Korean/SCSS. The choice is remembered in `localStorage`.
- **Loading screen** that cycles "Hello World!" in each language, written in its paired programming language.
- **Keyboard shortcuts:** `g` grid overlay, `b` black, `w` white, `s` sunlight theme.
- **Visit counter** that records each visit (count, time, IP address, and approximate location from ipinfo.io) in a JSONBin record.
- Responsive layout that works on phones, with a sticky section nav that highlights the current section.

## Tech stack

Static HTML, CSS, and JavaScript (jQuery 3.7) with no build step, hosted on GitHub Pages and deployed by GitHub Actions.

## Project structure

```
index.html              All page content; the English text lives only here
css/                    normalize, reset, variables, colors, layout, grid, media queries, loading screen
scripts/
  script.js             Navigation, scrolling, section highlighting, keyboard shortcuts
  locales.js            The 10 languages: flag colors, greetings, paired programming language
  i18n.js               Theme slider, translation, and programming-language restyling
  i18n/<code>.js        Translations (ar, es, fr, hi, it, ja, ko, mr, zh), keyed by data-i18n
  loadingScreen.js      Loading-screen greetings
  counter.js            Visit counter (JSONBin + ipinfo.io)
assets/                 Resume, logos, certificates, profile photos, fonts, favicon
.github/workflows/      GitHub Pages deployment
```

## Running locally

No build step is needed. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

The visit counter needs a `config.js` in the repo root. It is gitignored because it holds API keys:

```js
export const BIN_ID_JSON = '<base64 JSONBin bin ID>';
export const API_KEY_JSON = '<base64 JSONBin master key>';
export const API_KEY_IP = '<base64 ipinfo.io token>';
```

Without it, the counter doesn't run (you'll see an import error in the console), but the rest of the site still works.

## Updating content

- **Text:** edit `index.html`. Every translatable element has a `data-i18n` (plain text) or `data-i18n-html` (contains markup) key. When you change English text, update the same key in every `scripts/i18n/<code>.js` file; a missing key falls back to English.
- **New project or job:** copy an existing `.item` block in the Work or Background section, give its title and description new keys, and add those keys to each translation file.
- **Resume:** replace `assets/resume/Mayur-Veer-Resume.pdf`, keeping the same file name so the Contact link keeps working.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. The workflow:

1. Generates `config.js` from the repository secrets `BIN_ID_JSON`, `API_KEY_JSON`, and `API_KEY_IP`.
2. Uploads the site as a Pages artifact.
3. Deploys it to GitHub Pages.

Changes to `yml-scripts/` don't trigger a deploy.

## Ideas

- Email notification when someone visits the portfolio
- Spotify "now playing" integration
- Online/offline status indicator
- A command-prompt mode for navigating sections
