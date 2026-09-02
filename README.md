# Aman Kumar Jha — Portfolio

A single-page portfolio built with plain HTML, CSS, and JavaScript — no
build step, no framework, deploys to Netlify as-is.

## Design concept

The visual identity is a circuit schematic — a nod to the Electrical
Engineering degree behind the software work: a copper/signal-green palette
(`css/style.css` tokens, both a light and dark theme, following the
viewer's OS preference or the toggle in the nav), IBM Plex Mono for
headings/labels and IBM Plex Sans for body text, numbered section tags
(`§ 01 — About`, etc.), a via-ring timeline, corner-bracket ("register
mark") photo frame, and angular component-style buttons instead of soft
gradient pills.

## Structure

```
index.html          Page content/markup
css/style.css        All styling (dark/light theme via CSS variables)
js/script.js         Interactivity: nav, theme toggle, reveal animations,
                      typing effect, counters, contact form
js/data.js             EDIT THIS to update CGPA, ratings, question counts —
                      one change here updates every place that number shows
js/links.js           All project/demo/certificate links in one place
assets/Aman_Kumar_Jha_Resume.pdf   Local backup copy of your résumé
                      (the site's Resume buttons link to Google Drive
                      instead — see "Updating your résumé" below)
assets/images/profile.jpg          Hero photo (cropped/compressed for web)
assets/images/profile-cutout.png   Unused background-removed variant, kept
                      in case you want the cutout look again later
assets/images/favicon.svg          Browser tab icon
netlify.toml          Netlify config (publish dir + security headers)
```

## Updating your stats (CGPA, ratings, question counts)

Open **`js/data.js`**. Every number that changes over time — CGPA,
LeetCode rating/questions solved/badges, Codeforces max rating, CodeChef
stars, DevTinder's user count and uptime — lives in one `SITE_DATA` object
there. Change a value and it updates everywhere that number appears on the
page (the About intro, the stat counters, the Achievements cards, the
DevTinder project bullets) — you never need to go hunting through
`index.html` for where a number is hardcoded.

This works because those spots in `index.html` don't contain the number
directly — they hold a `data-field="leetcode.rating"` (or
`data-count-field="..."` for the animated stat tiles) attribute that
`js/script.js`'s `initSiteData()` reads on page load and fills in from
`js/data.js`. To make a new value editable the same way, wrap it in a
`<span data-field="your.new.key">current value</span>` in the HTML and add
`your: { new: { key: "current value" } }` to `SITE_DATA`.

## Deploying to Netlify

**Option A — drag and drop**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder in. Done — you'll get a live URL immediately.

**Option B — connect a Git repo (recommended, gives you auto-deploys)**
1. Push this folder to a new GitHub repo.
2. In Netlify: *Add new site → Import an existing project* → pick the repo.
3. Build command: leave blank. Publish directory: `.` (already set in
   `netlify.toml`).
4. Deploy.

The contact form uses **Netlify Forms** (`data-netlify="true"` in
`index.html`) — it works automatically once deployed on Netlify, no backend
or API key needed. Submissions show up in Netlify → Site → Forms.

## Updating your résumé

The "Resume" (nav bar) and "View Résumé" (About section) buttons link
straight to your Google Drive file:
`https://drive.google.com/file/d/10izmqnnO1ripsV3-HV6fIp4d_9Rdz8NM/view`

Since it points at the Drive file ID rather than an uploaded PDF, you can
replace/update the file in Drive at any time (keep the same file, use
Drive's "Manage versions" / overwrite) without touching any code here.
Just make sure the file's sharing is set to "Anyone with the link."

## Still to fill in

Three projects have live + repo links wired in but no description or tech
stack yet — **My-YoutTube**, **Yummy**, and **Tom & Jerry** (search
`project-todo` in `index.html` to find them fast). Send over what each app
does and what you built it with, and they'll read just like the other
project cards.

Everything else (name, education, experience bullets, skills, achievements,
socials, email, phone, all other project links) is filled in with your real
resume data and provided links.

## Logos and icons

`assets/images/icons/` holds every logo used on the page:

- **Real platform/company marks** (vector, inlined directly in `index.html`
  so they inherit the site's accent color): LeetCode, Codeforces, CodeChef,
  Accenture (mono version, unused now — see below).
- **Real logo images you provided**: `devtinder.png`, `accenture-color.png`
  (now used instead of the mono vector mark), `netflix-ai.png`,
  `tomjerry.png`, `yummy.png`, `myyoutube.png`, `documind.svg`, `ecell.jpg`,
  `trendydice.jpg`, each resized/compressed for web and wired into the
  matching project card, the Accenture experience card, and the
  ECELL/TrendyDice leadership cards.
- **Fetched official assets**: `nit-silchar.png` (institute seal),
  `jnv.png` (Navodaya Vidyalaya Samiti emblem), `atcoder.png` (AtCoder
  crest) — used in the Education timeline and Achievements/socials.
- **MoodMate** still uses a hand-drawn line icon (a smile) since no brand
  mark applies to it.

To swap any logo, just replace the file at its existing path in
`assets/images/icons/` — no HTML changes needed as long as the filename
stays the same.

## Adding/replacing the photo

The hero uses `assets/images/profile.jpg`, cropped to a waist-up portrait
and shown in a corner-bracket ("register mark") frame that floats with a
gentle continuous animation (`@keyframes photo-float` in `css/style.css`;
disabled automatically for visitors with `prefers-reduced-motion` set).

To swap it, replace that file with a new image of the same name — ideally
already cropped to roughly a 3:4 portrait focused on the subject (the
frame will `object-fit: cover` it, so a wildly different crop/aspect may
frame oddly) and resized to under ~1000px wide to stay fast.

`assets/images/profile-cutout.png` is a background-removed (transparent)
version generated earlier and left unused in case you want that look
again — it's not referenced anywhere in `index.html` right now.

## Local preview

No build tools needed — just open `index.html` in a browser, or serve it
locally:

```bash
npx serve .
```
