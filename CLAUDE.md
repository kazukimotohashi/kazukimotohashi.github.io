# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic website for Kazuki Motohashi, an Assistant Professor at Hitotsubashi University. The site is built with Hugo static site generator using the Anatole theme and deployed to GitHub Pages.

## Development Commands

```bash
# Build the site (output goes to docs/)
hugo

# Start local development server with drafts
hugo server -D
```

### Deployment
After making content changes:
1. Run `hugo` to rebuild the site
2. Commit changes including the updated `docs/` folder
3. Push to `main` branch (GitHub Pages serves from `docs/` on `main`)

## Architecture

### Key Files
- `config.toml`: Hugo configuration — site params, menu items, social icons, KaTeX/Mermaid settings, theme module import
- `assets/css/custom.css`: All custom styling (loaded after theme CSS). Uses Google Fonts (Raleway, Roboto, Noto Sans JP)
- `assets/js/custom.js`: Custom JavaScript (detail-tag toggle behavior, lazy loading, scroll effects)
- `go.mod`: Hugo module config — pins Anatole theme version

### Static Assets
- `static/images/`: Site images (profile photos, gallery photos, thumbnails, Open Graph image)
- `static/favicons/`: Favicon files

### Content Pages
- `content/research.md`: Research papers with expandable abstracts/media coverage via `detail-tag` shortcode
- `content/_index.md`: Homepage with bio
- `content/teaching.md`: Teaching and student information
- `content/cv.md`: CV page with link to PDF
- `content/misc.md`: Notes on research and other items
- `content/japanese.md`: Japanese-language version of bio/profile (元橋一輝)
- Photo gallery pages (`india.md`, `bangladesh.md`, `fujimi.md`, `worldheritage.md`): Use `row`/`column` shortcodes for grid layouts

### Custom Shortcodes (`layouts/shortcodes/`)
- `detail-tag.html`: Expandable toggle using a custom button/div structure (not native `<details>` tag). The JS in `custom.js` handles the toggle behavior
- `column.html`, `row.html`: CSS grid helpers for photo galleries
- `loading.html`: Loading indicator

## Content Editing Patterns

### Research Papers
Papers in `content/research.md` follow this pattern. Sections are: Working Papers, Publications, Selected Works in Progress.
```markdown
**[Paper Title](link-to-pdf)** Optional status info (e.g., journal acceptance)

{{< detail-tag "Media Coverage" >}}
  [Source Name](url), [Source Name](url)
{{< /detail-tag >}}

{{< detail-tag Abstract >}}
  Abstract text here
{{< /detail-tag >}}
&nbsp;
```
- Coauthors listed in parentheses after the title link
- `&nbsp;` used as a spacer between papers
- Media Coverage section is optional; Abstract section is standard for all papers

### Front Matter
All content pages use TOML front matter (`+++`) with: `description`, `date`, `author`, and optionally `title` and `thumbnail`.

## Important Notes

- The `docs/` folder is Hugo's output directory — it **must** be committed for GitHub Pages
- Theme is fetched via Hugo modules (`hugo mod`). Custom overrides go in `assets/` and `layouts/`, not in the theme source
- Math: KaTeX with `\( \)` inline, `\[ \]` or `$$ $$` block
- The `detail-tag` shortcode depends on JS in `custom.js` — if modifying toggle behavior, update both files together
- The CV PDF (`CV_KazukiMotohashi.pdf`) lives only in the build output `docs/cv/`, not in `static/` or `content/`. Hugo preserves it across normal builds, but avoid `--cleanDestinationDir` or deleting `docs/` entirely

## Work Notes (`note/`)

Every non-trivial task should leave a self-contained note under `note/` so future sessions can reconstruct **why** the work was done, **what** was decided, **what** happened, and **what** is left. (Hugo only renders `content/`, so `note/` does not appear on the public site.)

### Naming Convention

```
note/YYYY-MM-DD_<topic>.md         ← single MD (default)
note/YYYY-MM-DD_<topic>/           ← folder (long-running tasks only)
    ├── README.md                  ← purpose + status + links to other files
    ├── plan.md                    ← Context + Plan
    ├── tasks.md                   ← TODO / progress checklist
    ├── execution.md               ← timestamped action log
    └── results.md                 ← outputs + reflection
```

- `<topic>` is a short snake_case English slug (e.g. `gallery_redesign`).
- `YYYY-MM-DD` is the **start date** of the work, not the completion date — keep it fixed even if work spans multiple days.

### Single MD vs Folder

Use a **folder** if any of these hold; otherwise use a **single MD** (default):

1. The work is expected to span **5+ tasks** or **multiple sessions**.
2. **Multiple templates, shortcodes, or content pages** will be created or substantially refactored.
3. The work involves **design choices or layout comparison**.
4. The note will be **continuously appended** over a long period.

When in doubt, start with a single MD and promote to a folder once it grows.

### Single-MD Template

```markdown
# <Title>

**Date**: YYYY-MM-DD
**Status**: In Progress | Complete | Blocked
**Related Code**: <relative path(s)>
**Branch**: <git branch>

---

## Context
Why this work is needed; the underlying problem or motivation.

## Plan
The chosen approach (not alternatives). May be copied/condensed from the
plan-mode plan file.

## Tasks
- [x] Task 1
- [ ] Task 2

## Execution Log
- YYYY-MM-DD HH:MM — Did X. Found Y.
- YYYY-MM-DD HH:MM — Hit issue Z; resolved by W.

## Results
What changed, outputs produced, validation results, decision rationale.

## Reflection / TODO
Lessons learned, follow-ups, unresolved items.
```

### Folder File Roles

| File | Role | When created/updated |
|------|------|----------------------|
| `README.md` | One-line purpose, status, links to other files | At plan-confirmation time |
| `plan.md` | Context + Plan (copied/adapted from the plan file) | At plan-confirmation time |
| `tasks.md` | Checklist-style TODO list | At plan-confirmation; updated continuously |
| `execution.md` | Timestamped action log | Appended after each task completion |
| `results.md` | Outputs, validation, reflection | At work completion |

### Update Triggers

| Trigger | Action |
|---------|--------|
| **Plan confirmed** (after `ExitPlanMode` approval) | Create the file/folder; populate Context, Plan, Tasks. |
| **Task completed** (TodoWrite item flipped to `completed`) | Tick the box in Tasks; append 1–2 lines to Execution Log. |
| **Work completed** (end of session, or before commit/PR) | Fill in Results and Reflection; set Status to `Complete`. |

### Rules and Cautions

- **Do not rewrite or restructure existing notes** — preserve historical formats as-is.
- **Do not paste large log dumps** into notes. Reference file paths instead.
- **Do not include any draft or unpublished personal information** that should not be public — even though `note/` is excluded from the Hugo build, the repo is public on GitHub.
- Headers, keywords, and code blocks should remain in English; prose may be in Japanese.
