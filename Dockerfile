# ========================================
# BASE NODEJS IMAGE
# ========================================

FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ========================================
# BUILD ASSETS
# ========================================

FROM base AS build

COPY . "/ldsa"
WORKDIR "/ldsa"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store HUSKY=0 pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=@ladesa-ro/api-service --prod "/ldsa/.builds/api-service"

RUN pnpm deploy --filter=@ladesa-ro/api-client-fetch --prod "/ldsa/.builds/npm-api-client-fetch"
RUN cp "/ldsa/integrations/npm/api-client-fetch/docs" -r "/ldsa/.builds/npm-api-client-fetch/docs"

# ========================================
# RUNTIME / API-SERVICE
# ========================================

FROM base AS api-service
COPY --from=build "/ldsa/.builds/api-service" "/ldsa/api-service"
WORKDIR "/ldsa/api-service"
CMD pnpm run migration:run && pnpm run start:prod


# ========================================
# RUNTIME / NPM / API-CLIENT-FETCH / DOCS
# ========================================

FROM nginx:alpine AS npm-api-client-fetch-docs
COPY ./integrations/npm/api-client-fetch/nginx.conf /etc/nginx/nginx.conf 
COPY --from=build "/ldsa/.builds/npm-api-client-fetch/docs" "/ldsa/npm-api-client-fetch-docs/dist"
EXPOSE 80
