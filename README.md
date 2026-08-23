# Plinth — build your room, board by board

A full-stack interior design site built for a CV project. Instead of a generic
"3D room configurator" or a SaaS-style pricing page, the whole site is framed
as a physical studio corkboard: drag material swatches onto a room the way a
designer pins fabric and paint samples to a board, and watch a live spec
sheet (not a set of pricing tiers) total the job as you go.

## Stack

- **Client:** React 18 + Vite, React Router, Framer Motion for motion
- **Server:** Node.js + Express (JSON-file storage, no DB required to run it)
- No CSS framework — the design system is hand-written in `client/src/index.css`

## Why it doesn't look "AI-generated"

This was built deliberately against the common tells of templated AI output:
no purple/violet SaaS gradient, no Inter/Space Grotesk + bento grid layout,
no fake 5-star testimonials, no generic "3 pricing tiers," no stock
checkmark bullet lists. Instead:

- **Palette** comes from real interior materials — plaster, brass, moss,
  a single "redline" red used only as a hand-drawn annotation color, never
  as UI chrome.
- **Type** pairs Instrument Serif (display) with Archivo (body) and Caveat
  for hand-annotation moments — deliberately not the common
  Inter/Geist/Space Grotesk default.
- **Layout** borrows from a physical studio: washi tape, brass pins, torn
  paper edges, a tape-measure timeline on the Process page, a fan of paint
  swatches on the Customize page.
- **The pricing block** is a running, itemised spec sheet (base build +
  each material choice), not three flat subscription-style tiers.
- **Process steps** are labelled with the studio's actual project stages
  (site visit → board → quote → procurement → install → walkthrough)
  because that's a real sequence, not decorative numbering.

## Running it locally

```bash
# from the project root
npm run install:all
npm run dev
```

This starts the Vite dev server on `http://localhost:5173` and the Express
API on `http://localhost:4000` together (via `concurrently`). Vite proxies
any `/api/*` request to the Express server — see `client/vite.config.js`.

If you'd rather run them in two terminals:

```bash
cd server && npm install && npm run dev   # http://localhost:4000
cd client && npm install && npm run dev   # http://localhost:5173
```

### Building for production

```bash
npm run build
```

This builds the static client into `client/dist`. Serve that with any static
host and point it at a deployed instance of `server/` (set the client's
fetches to the deployed API URL, or reverse-proxy `/api` to it).

## API

| Method | Route              | Purpose                                   |
|--------|--------------------|--------------------------------------------|
| GET    | `/api/health`      | Liveness check                             |
| GET    | `/api/projects`    | List of portfolio projects                 |
| POST   | `/api/designs`     | Save a customizer board, returns a code    |
| GET    | `/api/designs/:code` | Look up a previously saved board          |
| POST   | `/api/contact`     | Submit a studio enquiry (name, email, city, room, notes) |

Saved boards and enquiries are written to `server/data/designs.json` and
`server/data/enquiries.json` (git-ignored) so the project runs with zero
external services or API keys. Swap those for a real database or an email
provider (e.g. Nodemailer, Resend) when this goes further than a CV project.

## Project structure

```
plinth/
  client/          Vite + React app
    src/
      components/  Navbar, Footer, Cursor, Reveal, PageTransition
      customizer/  RoomBoard, SwatchDeck, SpecSheet, roomData
      pages/       Home, Customize, Portfolio, Process, Contact
      data/        static project data for the client
      lib/api.js   fetch wrapper for the Express API
  server/          Express API
    routes/        projects, designs, contact
    middleware/    request body validation
    data/          JSON "database"
```
