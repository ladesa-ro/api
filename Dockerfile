# ========================================
# BASE NODEJS IMAGE
# ========================================

FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ========================================
# BUILD ASSETS
# ========================================

FROM base AS build
COPY . "/ldsa"
WORKDIR "/ldsa"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  HUSKY=0 \
  pnpm install --frozen-lockfile

RUN \
  WIREIT_LOGGER=metrics \
  pnpm run -r build

FROM build AS build-api-service

RUN pnpm deploy \
  --prod \
  --filter=@ladesa-ro/api.service \
  "/ldsa/.builds/api-service"

FROM build AS build-npm-api-client-fetch

RUN pnpm deploy \
  --prod \
  --filter=@ladesa-ro/api-client-fetch \
  "/ldsa/.builds/npm-api-client-fetch"

FROM build AS build-npm-api-client-fetch-docs

RUN pnpm deploy \
  --prod \
  --filter=@ladesa-ro/api-client-fetch-docs \
  "/ldsa/.builds/npm-api-client-fetch-docs"

# ========================================
# RUNTIME / API-SERVICE
# ========================================

FROM base AS api-service
COPY --from=build-api-service \
  "/ldsa/.builds/api-service" \
  "/ldsa/api-service"
WORKDIR "/ldsa/api-service"
CMD \
  pnpm run migration:run && pnpm run start:prod

# ========================================
# RUNTIME / NPM / API-CLIENT-FETCH / DOCS
# ========================================

FROM nginx:alpine AS npm-api-client-fetch-docs
COPY \
  ./integrations/npm/api-client-fetch-docs/nginx.conf \
  /etc/nginx/nginx.conf
COPY --from=build-npm-api-client-fetch-docs \
  "/ldsa/.builds/npm-api-client-fetch-docs" \
  "/ldsa/npm-api-client-fetch-docs"
EXPOSE 80
