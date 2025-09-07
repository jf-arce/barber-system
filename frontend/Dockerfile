# syntax=docker.io/docker/dockerfile:1

# ---- Etapa 0: Base ----
FROM node:22-bullseye AS base
WORKDIR /app

# Dependencias necesarias para módulos nativos y compilación
RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    make \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# ---- Etapa 1: Dependencias ----
FROM base AS deps
COPY package*.json ./
# Instalar dependencias con npm según lockfile
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# ---- Etapa 2: Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=/api

# Build de Next.js
RUN npm run build

# ---- Etapa 3: Production ----
FROM base AS runner
WORKDIR /app

# Variables importantes para Next.js
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no root (opcional)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
