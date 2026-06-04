# Vinayana Infra Projects

A premium, modern, light-theme website for **Vinayana Infra Projects** — a real
estate and infrastructure company. Built with a **React (Vite)** frontend and a
**Go** backend.

> _Building Landmarks. Creating Futures._

---

## ✨ Features

- Sticky **transparent → white** navbar with smooth hover underlines + mobile menu
- Animated **hero** with self-drawing city skyline (SVG), soft parallax, and count-up stats
- **About**, **Services** (animated cards), **Featured Projects** (live from the Go API), **Board of Directors**, **Why Choose Us** (parallax), **Contact** (working form + map), and a rich **Footer**
- Scroll-reveal (fade + slide-up) animations via Framer Motion, micro-interactions, gold/navy luxury palette
- Responsive, mobile-friendly, SEO meta tags, fast-loading
- Go REST API: `GET /api/projects`, `POST /api/contact` (validated + persisted), `GET /api/health`

---

## 🗂 Structure

```
vinayana Infra/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/ # Navbar, Hero, About, Services, Projects, Board, WhyChooseUs, Contact, Footer
│   │   ├── hooks/      # useCountUp (scroll-triggered counter)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css   # global theme (CSS variables)
│   ├── public/assets/logo.png
│   └── vite.config.js  # proxies /api → backend :8090
└── backend/           # Go standard-library API (no external deps)
    ├── main.go         # server bootstrap + graceful shutdown
    ├── handlers.go     # routes, CORS, validation
    ├── store.go        # JSON-file persistence for enquiries
    └── models.go
```

---

## 🚀 Running locally

### 1. Backend (Go)

> Requires Go 1.21+ ([install](https://go.dev/dl/) — `brew install go` on macOS).

```bash
cd backend
go run .
# → Vinayana Infra API listening on http://localhost:8090
```

Contact submissions are saved to `backend/contacts.json`.

### 2. Frontend (React)

> Requires Node 18+.

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The dev server proxies `/api/*` to the Go backend, so the contact form and live
projects work end-to-end. If the backend isn't running, the site still renders
with built-in fallback project data.

### Production build

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build
```

---

## 🔌 API reference

| Method | Endpoint        | Description                                   |
| ------ | --------------- | --------------------------------------------- |
| GET    | `/api/health`   | Health check + submission count               |
| GET    | `/api/projects` | Featured projects list                        |
| POST   | `/api/contact`  | Submit a contact enquiry (name, email, message required) |

**Environment variables (backend):** `PORT` (default `8090`), `DATA_FILE` (default `contacts.json`).
