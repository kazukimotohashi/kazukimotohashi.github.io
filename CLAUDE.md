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
