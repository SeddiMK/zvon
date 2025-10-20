FROM node:22-bullseye-slim AS base

# Расширяем heap V8, ограничиваем воркеры
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_PRIVATE_MAX_WORKERS=2

# Этап установки зависимостей
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Этап сборки
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Копируем .env (если нужен)
COPY .env* .

ARG COOKIE_DOMAIN
ENV NEXT_PUBLIC_COOKIE_DOMAIN=$COOKIE_DOMAIN
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Финальный рантайм
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# копируем public и собранное приложение
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=deps /app/node_modules ./node_modules  

USER nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]


# # ---------------------------------------------------

# FROM node:22-bullseye-slim AS base

# # Расширяем heap V8 до 4 ГБ (выбери 2048, если раннеру доступно ≤3 ГБ) чтобы не жаловался на оперативу при деплое
# ENV NODE_OPTIONS="--max-old-space-size=4096"

# # Ограничиваем параллелизм webpack-воркеров Next.js (меньше spawn → меньше RAM) чтобы не жаловался на оперативу при деплое
# ENV NEXT_PRIVATE_MAX_WORKERS=2

# # Этап установки зависимостей
# FROM base AS deps

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci
# RUN npm i sharp@0.34.3

# # Этап сборки приложения
# FROM base AS builder

# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# COPY --from=deps /app/package.json /app/package-lock.json ./

# # Копируем .env (если он есть) и загружаем переменные перед билдом
# COPY .env* .

# ARG COOKIE_DOMAIN

# ENV NEXT_PUBLIC_COOKIE_DOMAIN=$COOKIE_DOMAIN

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Загружаем переменные окружения перед билдом
# # RUN export $(grep -v '^#' .env | xargs) && npm run build
# RUN npm run build

# FROM base AS sharp

# RUN npm install -g --arch=x64 --platform=linux --libc=glibc sharp@0.34.2

# # Финальный образ
# FROM base AS runner

# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=sharp --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp

# # Копируем необходимые файлы
# COPY --from=builder /app/public ./public

# # Копируем собранное приложение
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp
# ENV NODE_ENV=production
# ENV PORT=3000

# EXPOSE 3000

# # Запуск приложения
# CMD ["node", "server.js"]
