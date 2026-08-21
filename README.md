# Dấu Ấn Điện Biên

React + Vite frontend với backend realtime Convex — cấu trúc phẳng, sẵn sàng deploy Vercel.

```text
.
├── convex/          # Schema + mutations/queries
├── public/          # Static assets (ảnh, audio)
├── src/             # React app
├── index.html
├── vite.config.ts
├── vercel.json
└── package.json
```

## Yêu cầu

- Node.js 20+

## Chạy local

```bash
npm install

# Terminal 1 — Convex
npm run dev:convex

# Terminal 2 — Vite
npm run dev
```

Sao chép `.env.example` → `.env.local` và điền `VITE_CONVEX_URL` (URL từ Convex dashboard / `convex dev`).

## Build

```bash
npm run build
```

## Deploy

1. **Convex (production):** `npx convex deploy`
2. **Vercel:** import repo, Root Directory = `.` (root), env `VITE_CONVEX_URL` = URL Convex production.
