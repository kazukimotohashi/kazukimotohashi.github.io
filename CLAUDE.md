# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic website for Kazuki Motohashi, an Assistant Professor at Hitotsubashi University. The site is built with Hugo static site generator using the Anatole theme and deployed to GitHub Pages.

## Development Commands

### Building and Previewing
```bash
# Build the site (output goes to docs/)
hugo

# Start local development server with drafts
hugo server -D

# Build for production
hugo --minify
```

### Deployment
The site is deployed to GitHub Pages from the `docs/` folder. After making content changes:
1. Run `hugo` to rebuild the site
2. Commit changes including updated `docs/` folder
3. Push to `main` branch

## Architecture

### Content Structure
- `content/`: Markdown files for each page
  - `_index.md`: Homepage with bio and profile photo
  - `research.md`: Research papers with expandable abstracts using custom shortcode
  - `cv.md`, `teaching.md`, `misc.md`, `japanese.md`: Other content pages
  - Photo gallery pages: `india.md`, `bangladesh.md`, `fujimi.md`, `worldheritage.md`

### Configuration
- `config.toml`: Main Hugo configuration
  - `publishDir = "docs"`: Output directory for GitHub Pages
  - Theme imported via Hugo modules: `github.com/lxndrblz/anatole`
  - Menu items, social icons, and site params defined here
  - Math support enabled via KaTeX
  - Mermaid diagrams enabled
  - Custom CSS at `assets/css/custom.css`

### Custom Shortcodes
- `layouts/shortcodes/detail-tag.html`: Creates expandable `<details>` tags for abstracts and media coverage sections in research.md
- `layouts/shortcodes/column.html`, `row.html`: Layout helpers for photo galleries
- `layouts/shortcodes/loading.html`: Loading indicator

### Static Assets
- `static/images/`: Photos and images (profile pictures, fieldwork photos, thumbnails)
- `static/favicons/`: Site favicons
- Research PDFs and other documents stored in `static/` subfolders

### Theme Integration
The Anatole theme is fetched automatically via Hugo modules (configured in `go.mod`). Custom modifications are minimal:
- Custom CSS overrides in `assets/css/custom.css`
- Custom shortcodes in `layouts/shortcodes/`

## Content Editing Patterns

### Research Papers
Research papers in `content/research.md` use a specific pattern:
```markdown
**[Paper Title](link-to-pdf)** Optional status info

{{< detail-tag "Media Coverage" >}}
  [[Source Name](url)]
{{< /detail-tag >}}

{{< detail-tag Abstract >}}
  Abstract text here
{{< /detail-tag >}}
&nbsp;
```

### Front Matter
All content pages use TOML front matter with:
- `title`, `description`, `date`, `author`
- `thumbnail` for pages with preview images

## Important Notes

- The `docs/` folder is the Hugo output directory and must be committed for GitHub Pages deployment
- The site uses Hugo modules, so `hugo mod` commands may be needed if theme updates are required
- Math equations are supported using KaTeX with delimiters `\( \)` for inline and `\[ \]` or `$$ $$` for block
- Custom CSS is loaded after theme CSS, allowing overrides
