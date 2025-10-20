# Honotan

Honotan is a lightweight monorepo starter combining Hono for building HTTP APIs and TanStack Start for the web client. It uses Bun as the primary runtime/dependency manager while keeping some tooling compatibilities with Node/PNPM for subpackages.

This README documents how to get the repo running locally, explains the project layout, and lists common developer workflows.

## Repository layout

- `packages/api` — Hono-based API server with Drizzle ORM, Redis/BullMQ task queue, and utilities.
- `packages/web` — TanStack Start 
- `index.ts` — (top-level) lightweight entry used for quick experiment runs with Bun.

Other notable files:

- `packages/api/src` — server source, controllers, services, tasks, and database schema (`packages/api/schema`).
- `packages/api/static/openapi.yaml` — OpenAPI specification used by Swagger UI (served by the API).

## Prerequisites

This project is developed with Bun as the primary runtime. On macOS (zsh) install Bun first:

```bash
curl -fsSL https://bun.sh/install | bash
```

Optional (used by `packages/api`):

- Docker & Docker Compose — for running infra (Postgres, Redis) via `npm run infra:up` inside `packages/api`.
- PNPM — `packages/api` uses `pnpm` in its package metadata but Bun can be used to install workspace deps.

Verify Bun is installed:

```bash
bun -v
```

## Install dependencies

At the repository root (preferred for Bun workspaces):

```bash
bun install
```

This will install dependencies for the workspace (both `packages/api` and `packages/web`) according to the top-level `package.json` workspaces setting.

If you prefer using PNPM inside `packages/api` (because of `drizzle-kit` and `packageManager`), you can run:

```bash
cd packages/api
pnpm install
```

## Development

There are convenient top-level scripts to start the API and web concurrently in separate terminals.

Start the API (runs Hono with hot reload and pretty logging):

```bash
bun run api
```

Start the web client (vite server):

```bash
bun run web
```

You can run both in separate terminal tabs/windows.

### API-specific workflows (packages/api)

From `packages/api` you have additional scripts. Examples:

- Start dev server (hot reload):

```bash
bun run dev
```

- Database migrations and generation (Drizzle):

```bash
bun run db:generate
bun run db:migrate
bun run db:drop
```

- Development infra with Docker Compose (starts Postgres + Redis + app profiles):

```bash
bun run infra:up
bun run infra:logs
bun run infra:down
```

Notes:

- `packages/api` lists `packageManager: pnpm@9.11.0` in its `package.json`. Bun works for workspace installs but some CI or maintainers may prefer PNPM for consistent lockfiles.
- The API runs on Bun (Hono) and uses Drizzle ORM, BullMQ for background tasks, Redis for queueing, and Postgres as the primary datastore.

### Web-specific workflows (packages/web)

From `packages/web`:

- Start dev server:

```bash
bun run dev
```

- Build for production:

```bash
bun run build
bun run start
```

The web app uses Tanstack Start. It relies on modern Bun-compatible tooling but keeps package.json compatible with Node-style installs.

## Environment and configuration

- Check `packages/api/.env.example` or the `.env` file in `packages/api` (if present) for required environment variables (database DSN, Redis URL, JWT secrets, etc.).
- OpenAPI spec is available at `packages/api/static/openapi.yaml` and the API exposes a Swagger UI integration.

## Running tests

There are no test runners configured at the top-level by default. If you add tests, consider using Bun's test runner or a framework of your choice (Vitest / Jest) and add scripts to the relevant package.json.

## Linting & Formatting

Prettier is included in `packages/api` devDependencies. Add project-level ESLint or Prettier configs if you want enforced formatting across workspaces.

## Deployment

This repo does not include a full deployment pipeline. Typical steps:

1. Build the web client: `packages/web` => `bun run build`.
2. Build the API: compile TypeScript or run via Bun in production mode.
3. Run infrastructure (Postgres, Redis) using managed services or Docker Compose in production-like environments.

Examples using Docker Compose (API):

```bash
cd packages/api
bun run infra:up
```

## Useful commands (summary)

- Install deps: `bun install`
- Run API dev: `bun run api` or `cd packages/api && bun run dev`
- Run Web dev: `bun run web` or `cd packages/web && bun run dev`
- Generate/migrate DB (api): `cd packages/api && bun run db:generate && bun run db:migrate`
- Bring infra up (api): `cd packages/api && bun run infra:up`

## Contributing

Contributions are welcome. A suggested workflow:

1. Fork the repo and create a feature branch.
2. Keep changes small and focused; update or add tests where applicable.
3. Open a pull request describing what changed and why.

Please follow repository code style and keep the workspace dependency handling predictable. If you add new workspace packages, update the top-level `package.json` workspaces array.

## License

This project includes a `LICENSE` file in the repository root. Keep license headers and respect contributor license terms.

## Next steps / To improve

- Add environment examples (`.env.example`) for `packages/api` to help new contributors.
- Add a small `Makefile` or dev script to run API + Web concurrently.
- Add automated tests and CI configuration (GitHub Actions) for linting, build, and tests.

If you'd like, I can also:

- add a `packages/api/.env.example` with common variables,
- create a small `dev` script to run both servers concurrently,
- or generate a GitHub Actions workflow template for CI.

# Honotan

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Description

This repo is boilerplate for tanstack start and hono. using bun as package manager and monorepo manager.
