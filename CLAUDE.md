# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
docker compose up -d          # start local Postgres (required before dev)
pnpm dev                      # Next.js dev server at localhost:3000

# Database
pnpm db:migrate               # create + apply a new migration (runs prisma migrate dev)
pnpm db:seed                  # seed 60 Amazon + 40 local products + admin user
pnpm db:generate              # regenerate Prisma client after schema changes
pnpm db:studio                # open Prisma Studio GUI

# Quality gates — all must pass before any task is "done"
pnpm typecheck                # tsc --noEmit
pnpm lint                     # eslint
pnpm test                     # vitest run (pure logic unit tests)
pnpm build                    # production build

# Run a single test file
pnpm test -- __tests__/lib/fx.test.ts
```

## Architecture

### Layering rule
UI (`app/`, `components/`) → feature logic (`lib/`) → data access (`server/`) → DB (Prisma). Dependencies point inward only. Business logic never imports React; UI never imports Prisma directly.

### Where things live
- `lib/` — pure, framework-free modules. `fx.ts`, `cart-math.ts`, `order-status.ts` are the source of truth for all monetary calculations and status logic. These have unit tests in `__tests__/`.
- `lib/schemas/` — Zod schemas are the source of truth for every entity shape. TS types are derived with `z.infer<>`, never hand-written in parallel.
- `server/actions/` — all mutations (Server Actions). Every action validates input with Zod before touching the DB.
- `server/services/` — mock service seam for Amazon and local store catalogs. `mock-amazon.ts` and `mock-stores.ts` implement a shared `ProductCatalogService` interface. UI never imports these directly — only through the factory. A real integration replaces the implementation, not the interface.
- `stores/` — Zustand for client state (cart, selected city). Business logic (fee math, totals) lives in `lib/cart-math.ts`, not in the store.
- `app/api/tracking/[orderId]/stream/` — SSE endpoint (`runtime = 'nodejs'`). Polls `RiderTracking` every 2s, emits `{lat, lng, heading, status}`, sends heartbeat every 15s.

### Auth
Auth.js v5 (`next-auth@beta`). Google + Credentials (bcrypt). Config at `lib/auth.ts`, route at `app/api/auth/[...nextauth]/route.ts`. Session carries `id` and `role`. Every admin Server Action re-checks `session.user.role === 'ADMIN'` inside the action body — not just on the route.

### Data
Prisma 6 (NOT 7 — v7 requires a driver adapter). All monetary values use `Decimal` (not `Float`) to avoid precision errors. `priceSnapshotHNL` on `OrderItem` is immutable — never recalculated after order creation. Card data is never sent to the server, never stored, never logged.

### Realtime
SSE, not Socket.io. Socket.io is incompatible with Vercel serverless. The SSE stream is one-way (server → client), which is sufficient for rider tracking. Admin advances rider state via a Server Action; the next SSE poll picks up the DB change.

### OrderStatus flow
- Amazon: `ORDERED → MIAMI_WAREHOUSE → IN_TRANSIT_HN → CUSTOMS → OUT_FOR_DELIVERY → DELIVERED`
- Local: `ORDERED → RIDER_ASSIGNED → PICKING_UP → ON_THE_WAY → DELIVERED`
- Valid transitions and Spanish labels are in `lib/order-status.ts` — do not hardcode status strings anywhere else.

### Design
DESIGN.md at the project root locks typography, color tokens, component rules, and motion philosophy. shadcn/ui primitives in `components/ui/` are restyled to the CLICK identity — never used stock. Three skills are installed in `.claude/skills/`:
- `taste-design` — invoked to regenerate DESIGN.md if scope expands
- `impeccable` — run `/impeccable audit <surface>` at the end of each UI phase
- `emilkowal-animations` — review any motion work before marking it done

### Environment
- Local dev: Docker Compose Postgres. `.env` is pre-filled for Docker, copy `.env.example` to add optional keys (Mapbox, Google OAuth).
- Production: Vercel + Neon. `DATABASE_URL` uses pooled Neon connection; `DIRECT_URL` is the direct connection (required for migrations).

## Hard rules (non-negotiable)
- No `any`. No `!` non-null assertions to silence TypeScript — fix the actual nullability.
- No card fields on the server — `server/actions/checkout.ts` schema must never include card numbers, expiry, or CVC.
- No raw SQL — parameterized queries via Prisma only.
- `pnpm build + typecheck + lint + test` must all pass before any task is complete.
- When adding a dependency: check `pnpm info <pkg> version` for current stable. Do not pin from memory.
