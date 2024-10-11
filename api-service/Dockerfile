FROM node:22 AS base
# RUN apt update -y
# RUN apt install -y git
WORKDIR /var/lib/ladesa-ro/r/api/api-service

FROM base AS prod-deps
COPY ./api-service/package.json ./api-service/package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --omit=dev --ignore-scripts

FROM prod-deps AS dev-deps
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci

FROM dev-deps AS assets
COPY ./api-service/tsconfig.json ./api-service/tsconfig.build.json ./
COPY ./api-service/src/ ./src/
COPY ./version.json ./
RUN npm run build
COPY ./api-service/scripts/ ./scripts/
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /var/lib/ladesa-ro/r/api/api-service /var/lib/ladesa-ro/r/api/api-service
WORKDIR /var/lib/ladesa-ro/r/api/api-service

CMD npm run migration:run && npm run start:prod
