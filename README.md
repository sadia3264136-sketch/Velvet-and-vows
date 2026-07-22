# VELVET & VOWS

An elite local platform for Event Planners, Wedding Stylists, and Corporate Gala Curators — built with React, Vite, Tailwind CSS, and a Binance-inspired flat-surface design system.

## Pages

- `/` — Homepage with the CLOU.-style rotating ring gallery hero, stats band, featured categories, and light footer.
- `/planners` — Event Planners Directory with search + budget/event-type/city filters.
- `/planners/:id` — Transactional light-mode booking page with pricing tiers, availability picker, and inquiry form (routes to `khaanii654321@gmail.com`).
- `/admin` — Password-protected image dashboard, backed by Vercel Blob (see below).

## File structure

This project uses a **flat structure** — every `.jsx`/`.js`/`.css` file lives at the project
root next to `package.json` (no `src/` folder), so it uploads cleanly via drag-and-drop or a
plain GitHub web upload with no path surprises. Two folders are kept because the tooling
requires them: `api/` (Vercel Serverless Functions must live here) and `public/` (Vite's
convention for static assets like the favicon).

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Admin image dashboard (shared for every visitor)

Go to `/admin` (linked at the bottom of the site footer) to upload real photos for every
event category and every planner — no code editing required. Uploaded photos are stored in
**Vercel Blob** and show up for *every* visitor on *every* device, not just the browser that
uploaded them.

### One-time setup on Vercel (required before this works)

1. Deploy the project to Vercel first (see below).
2. In the Vercel dashboard, open your project → **Storage** tab → **Create Database** →
   **Blob**. Connect it to this project. Vercel automatically adds a `BLOB_READ_WRITE_TOKEN`
   environment variable — you don't need to copy/paste anything.
3. Still in the project settings → **Environment Variables**, add:
   - `ADMIN_PASSWORD` — the password the admin dashboard requires to log in (defaults to
     `velvet2026` if you skip this — change it before giving anyone access).
   - `ADMIN_TOKEN_SECRET` — optional; any random string. If omitted, `ADMIN_PASSWORD` is
     reused to sign login sessions.
4. Redeploy (Vercel → Deployments → Redeploy) so the new environment variables take effect.

### Using it

- Open `/admin`, enter the password, and upload a photo per category or planner.
- The photo instantly appears in the homepage ring gallery, the featured categories grid,
  the directory cards, and the planner's booking page — for everyone, immediately.
- "Reset all images" clears every uploaded photo back to the default icon/initials look.
- Logging in issues a 12-hour session token (stored in `sessionStorage`); the real password
  never ships in the JavaScript bundle, and every upload/delete request is verified
  server-side in `api/_lib/auth.js`.

### Local development note

`npm run dev` (plain Vite) does **not** run the `/api/*.js` serverless functions, so the
dashboard can't load or save images that way. To test the dashboard locally, install the
Vercel CLI and run:
```bash
npm i -g vercel
vercel link      # first time only, links this folder to your Vercel project
vercel env pull  # pulls BLOB_READ_WRITE_TOKEN and your env vars into .env.local
vercel dev
```

## Deploy to Vercel

This project includes a `vercel.json` preconfigured for a Vite SPA (build command, output directory, and rewrites for client-side routing).

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

**Option B — Vercel Dashboard**
1. Push this folder to a GitHub repo (or drag-and-drop the folder into the Vercel dashboard).
2. Import the project in Vercel.
3. Framework preset: Vite (auto-detected). Build command `npm run build`, output directory `dist` (already set in `vercel.json`).
4. Deploy.

## Design tokens

All colors, radii, and fonts live in `tailwind.config.js` and match the brief's design system exactly (Binance Yellow `#FCD535`, Canvas Dark `#0b0e11`, etc.). Update tokens there to restyle the whole site consistently.
