### Multi-stage Dockerfile for Bun + Hono
### Stage 1: build with bun
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy current package (assumes build context is `packages/api`)
COPY . ./

# Install dependencies (install dev deps in builder for building)
RUN bun install

# Build step (if your project has a build script)
RUN ["bash", "-lc", "if [ -f tsconfig.json ]; then bun run build || true; fi"]

### Stage 2: runtime
FROM oven/bun:latest
WORKDIR /app

# Copy full app from builder
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV BUN_INSTALL_DIR=/root/.bun

EXPOSE 9005

# Default command — run dev server by default. Change to a production start if you have one.
CMD ["bun", "run", "dev"]
