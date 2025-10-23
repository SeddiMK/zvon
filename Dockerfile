# FROM node:22-bullseye-slim AS base

# # Расширяем heap V8, ограничиваем воркеры
# ENV NODE_OPTIONS="--max-old-space-size=4096"
# ENV NEXT_PRIVATE_MAX_WORKERS=2

# # Этап установки зависимостей
# FROM base AS deps
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm ci

# # Этап сборки
# FROM base AS builder
# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Копируем .env (если нужен)
# # COPY .env* .

# ARG COOKIE_DOMAIN
# ENV NEXT_PUBLIC_COOKIE_DOMAIN=$COOKIE_DOMAIN
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Удаляем старую сборку перед билдом
# # RUN rm -rf dist

# RUN npm run build

# # Финальный рантайм
# FROM base AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs \
#  && adduser --system --uid 1001 nextjs

# # копируем public и собранное приложение
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=deps /app/node_modules ./node_modules  

# USER nextjs

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000

# EXPOSE 3000

# CMD ["node", "server.js"]
# ---------------------------------------------------------------------------------------------
FROM node:22-bullseye-slim AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
