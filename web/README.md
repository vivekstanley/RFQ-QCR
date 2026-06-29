# RFQ-QCR Web

Landing page and authentication UI for the RFQ-QCR application, styled with the [TapTap Design System](https://www.figma.com/community/file/1044528985624992085/taptap-design-systemdevelopers).

## Pages

- `/` — Landing page with product overview and MVP workflow
- `/login` — User login
- `/signup` — User registration (creates account via API)
- `/dashboard` — Post-signup welcome page (protected)

## Development

Run the API server and web app in separate terminals.

**Terminal 1 — API:**

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

**Terminal 2 — Web:**

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173`. Signup requests are proxied to the API at `http://localhost:3001`.

## Build

```bash
npm run build
npm run preview
```
