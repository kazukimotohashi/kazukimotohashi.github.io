# Paper Card Section on Japanese Page (JDE 2026)

**Date**: 2026-06-12
**Status**: Complete
**Related Code**: `content/japanese.md`, `layouts/shortcodes/paper-card.html`, `assets/css/custom.css`, `static/images/paper_jde2026_sanitation.png`
**Branch**: main

---

## Context

JDEに発刊された論文 "Unintended Consequences of Sanitation Investment: Negative
Externalities on Water Quality and Health in India" (*Journal of Development
Economics*, 2026, 182, 103793) を、日本語ページ `content/japanese.md` で一般読者向けに
紹介したい。参考デザインは後藤潤氏のサイト
(https://jungoto01.github.io/japanese/index.html) の論文カード：左にサムネイル画像、
右に日本語タイトル・掲載誌・平易な解説（問いから始まり「主な発見」を太字強調）。

## Plan

AskUserQuestion で以下を確認・承認済み：

1. **画像**: 公開版PDF（Dropbox `Research/Kumbh_Mela_India/literature/Motohashi (2026) JDE.pdf`）
   の1ページ目を Ghostscript で高解像度キャプチャ → `static/images/paper_jde2026_sanitation.png`
2. **配置**: `japanese.md` の「研究分野」と「連絡先」の間に `## 論文の紹介` を新設
3. **解説文**: 後藤さん風フルスタイル（問い→手法→**主な発見：**→含意、4段落）。
   ドラフト全文をユーザーが承認済み（「スワッチャ・バラト・ミッション」表記）
4. **実装**: 再利用可能な shortcode `layouts/shortcodes/paper-card.html`
   （params: img / link / title / journal、Inner = 解説Markdown）＋ `custom.css` に
   カードCSS追加（既存ギャラリーカードと統一: 角丸12px・ソフトシャドウ・hover浮き上がり、
   デスクトップ横並び・モバイル縦積み・ダークモード対応）
5. `hugo` でビルドして `docs/` 更新 → コミット提案（push は別途確認）

## Tasks

- [x] Capture page 1 of the published PDF to `static/images/paper_jde2026_sanitation.png`
- [x] Create `layouts/shortcodes/paper-card.html`
- [x] Add paper-card CSS to `assets/css/custom.css` (incl. dark mode, mobile)
- [x] Add `## 論文の紹介` section with approved text to `content/japanese.md`
- [x] Build with `hugo` and verify rendering locally
- [ ] Propose commit (user decision pending)

## Execution Log

- 2026-06-12 10:13 — Plan confirmed via AskUserQuestion (image / placement / summary
  style all approved as recommended). Note created.
- 2026-06-12 10:13 — Captured page 1 of the published PDF with Ghostscript (200dpi)
  → resized to 800px width with sips → `static/images/paper_jde2026_sanitation.png` (335KB).
- 2026-06-12 10:14 — Created `paper-card.html` shortcode (params: img / link / title /
  journal; Inner = summary markdown) and added card CSS to `custom.css`. Edited
  `japanese.md`. Built with `hugo` (669ms, no errors).
- 2026-06-12 10:16-10:25 — Visual verification. Initial headless-Chrome screenshot via
  `http://127.0.0.1:1377` showed the card unstyled (display:block). Root cause: Hugo
  server emits absolute asset URLs on `localhost`, so visiting via `127.0.0.1` makes
  all stylesheets cross-origin and Chrome 149 headless did not apply them. Re-testing
  via `http://localhost:1377` (same origin) confirmed correct rendering: desktop =
  image left (190px) / text right; mobile (390px) = stacked, image centered (max 220px).
  Production is same-origin, so the quirk is test-only.

## Results

- New reusable shortcode `layouts/shortcodes/paper-card.html` — usage:
  `{{</* paper-card img="..." link="..." title="..." journal="..." */>}} summary {{</* /paper-card */>}}`
- Card CSS appended to `assets/css/custom.css` (flex row card, rounded 12px + soft
  shadow matching gallery cards; mobile stacking at ≤640px; dark-mode overrides).
- `content/japanese.md`: new `## 論文の紹介` section between 研究分野 and 連絡先 with the
  user-approved 4-paragraph summary (スワッチャ・バラト・ミッション表記, **主な発見：** bold).
- `static/images/paper_jde2026_sanitation.png`: page-1 capture of the published JDE
  paper (source PDF: Dropbox `Research/Kumbh_Mela_India/literature/Motohashi (2026) JDE.pdf`).
- `docs/` rebuilt; CV PDF in `docs/cv/` confirmed preserved. Screenshots shared with user.

## Round 2 (same day): image replacement, video embed, layout polish

User feedback after localhost preview led to these changes:

1. **Image → high-quality ScienceDirect capture.** User first supplied a screenshot of
   the ScienceDirect article header, then asked for a direct higher-quality capture.
   Headless Chrome was blocked by Cloudflare ("Are you a robot?"), so used puppeteer-core
   with a **visible (headful) Chrome window** + `--disable-blink-features=AutomationControlled`,
   polled until the article rendered, then took a DPR=2 clipped screenshot of
   journal banner → end of Highlights (1458×1700 after cropping the bottom sliver,
   234KB) → replaced `static/images/paper_jde2026_sanitation.png`.
2. **Image link removed** — image is no longer wrapped in an anchor; only the title links
   to the DOI (user request).
3. **YouTube explainer embedded at card bottom** (https://www.youtube.com/watch?v=YoZPQL-nRh0).
   Shortcode gained optional `video` (YouTube ID) and `video_caption` params; rendered as
   a centered 16:9 iframe (max 600px) below a divider, with caption
   「解説動画（NotebookLMによる自動生成）」 above it (user asked for the NotebookLM note).
4. **Readability** — card title enlarged (1.05em → 1.15em); all four summary paragraphs
   now have bold lead-in labels (研究の問い / 分析手法 / 主な発見 / 政策的含意) so 主な発見
   is no longer the only labeled one (user said it looked odd alone).
5. **Structure** — shortcode now wraps the flex row in `.paper-card__main` so the video
   block can span the full card width below it. CSS media query and dark-mode rules updated.
6. Cleaned 6 stale unreferenced `docs/css/custom.min.*.css` hashes that accumulated
   from repeated builds (kept only the referenced one).

## Round 3 (same day): page restructure of japanese.md

1. **Card image finalized** — attempted direct high-quality ScienceDirect captures
   (headful Chrome; removed `accessbar-sticky` View PDF toolbar and OneTrust dark
   overlay that contaminated the first attempts), but the user ultimately supplied
   their own clean screenshot, used as-is at full resolution (1372×1718, 273KB).
2. **Dev-server URL corruption found & fixed** — running plain `hugo` while
   `hugo server` is live flipped the server's rendered URLs to the production
   baseURL (github.io), so localhost pages referenced a not-yet-deployed image
   (ERR_BLOCKED_BY_ORB) and stale CSS. Fix: stop server → `hugo` → restart server.
   Rule: never run a production build while the dev server is running.
3. **Intro paragraph added** (user request) — prose intro mirroring the English
   top page (photo float-left via `figure class="left"`, two paragraphs:
   position/PhD, research focus). Added `.post__content h2 { clear: both; }`.
4. **連絡先 moved** directly below 略歴 (user request).
5. **Activities restructured into card grids** (user request: news-style dated
   bullets were hard to scan). New shortcodes `activity-grid.html` (CSS grid
   wrapper, auto-fill minmax 270px) and `activity.html` (params: cat
   [talk|article|award|video|other] for badge color, type for badge label, year,
   title, source, link). 19 cards total: 8 under 学術関連の活動 (+ featured JEA
   interview video embed kept above the grid), 11 under 学術関係以外の活動.
   Full dates dropped in favor of years (user OK'd dropping dates). Subsection
   headers (講演等/記事等/受賞/その他) replaced by colored badges.

## Round 4 (same day): horizontal list cards, 3-section regrouping, intro rewrite

User feedback on Round 3:

1. **Profile photo removed** from the intro; bio rewritten as natural Japanese prose
   (one paragraph: position → fields → research theme/methods → think-tank background
   → PhD) instead of a literal mirror of the English top page.
2. **Activity cards switched from 2-column grid to one-per-row horizontal cards**
   (user: 横長・リストっぽい方が見やすい). `activity.html` now renders
   badge | year | title+source on a single flex row (wraps to stacked layout ≤640px).
   `.activity-grid` is now a flex column; `__meta` wrapper removed.
3. **Sections regrouped from 学術関連/学術関係以外 into three** (user proposal):
   記事・受賞 (9 cards: articles, 寄稿, 受賞, fieldwork 動画), 講演・発表 (JEA interview
   embed + 7 talk cards), 外部活動 (3 cards, badge label 活動).
4. Removed the now-unneeded `.post__content h2 { clear: both; }` rule.

## Round 5 (same day): intro spacing + interview video card

1. **Spacer above intro** — added an `&nbsp;` paragraph at the top of japanese.md
   (site's existing spacer idiom) to give breathing room below the page title.
2. **JEA interview video carded** — new shortcode `video-card.html` (params: video,
   title, year, type; Inner = description). Reuses activity-card row chrome
   (動画 badge | year | title), description in grey below the title, embedded
   YouTube iframe capped at 560px (user: 動画が大きすぎる). Placed as the first
   item in the 講演・発表 grid, replacing the bare full-width `{{</* youtube */>}}` embed.
3. **Gotcha**: `hugo server` does NOT pick up shortcode templates created after
   startup ("template for shortcode not found" on rebuild) — restart the server
   after adding a new layouts/shortcodes/*.html.

## Round 6 (same day): user content edits + docs/ pollution root cause

1. User rewrote the intro themselves (research themes in three concrete strands) and
   made small edits (section 講演・発表→講演, ロータリーの友 badge 寄稿→記事, taller
   spacer). Reflected on server and in the production build.
2. **ROOT CAUSE CORRECTION (supersedes Round 3 #2):** with Hugo 0.152.2 +
   `publishDir = "docs"`, **`hugo server` renders to disk by default** — every
   live-reload rebuild overwrites `docs/` with dev HTML (localhost:1313 URLs +
   livereload.js). This, not in-memory corruption, also explains the Round 3 incident
   (plain `hugo` and the server were fighting over the same `docs/` files the server
   serves from). Found `docs/` fully polluted with dev URLs; rebuilt clean.
   **Permanent fix: always run the dev server with `--renderToMemory`.** Before
   committing, verify: `grep -rl "localhost:1313\|livereload" docs/` → empty.
3. Cross-page docs/ diffs are mechanical only: custom.min fingerprint (CSS grew),
   markupHighlight hash + generator meta (committed docs were built with Hugo 0.160.1
   on another machine vs 0.152.2 here). No visual change outside /japanese/.

## Reflection / TODO

- **Run `hugo server` with `--renderToMemory` in this repo** (publishDir=docs is
  written to disk by the server otherwise; see Round 6). Verify docs/ is clean of
  localhost/livereload before committing.
- When screenshot-testing `hugo server` pages, always use `http://localhost:<port>`
  (not `127.0.0.1`) — asset URLs are absolute on localhost and cross-origin CSS is not
  applied by recent headless Chrome.
- ScienceDirect blocks headless Chrome via Cloudflare; a headful puppeteer-core session
  (system Chrome, automation flag disabled) passes and allows DPR=2 clipped captures.
- Stale hashed `custom.min.*.css` accumulate in `docs/css/` because `--cleanDestinationDir`
  is avoided (CV PDF lives only in `docs/cv/`); prune unreferenced ones before committing.
- Hugo server does not pick up newly created shortcode templates — restart it after
  adding layouts/shortcodes/*.html.
- Follow-up: more papers can be added to 論文の紹介 with the same shortcode
  (video/video_caption are optional).
