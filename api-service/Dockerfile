FROM node:22 as base
# RUN apt update -y
# RUN apt install -y git
WORKDIR /var/lib/ladesa-ro/r/api/api-service

FROM base as prod-deps
COPY package.json ./
# COPY package.json package-lock.json .npmrc ./
RUN npm install --omit=dev --ignore-scripts

FROM prod-deps as dev-deps
RUN npm install

FROM dev-deps as assets
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /var/lib/ladesa-ro/r/api/api-service /var/lib/ladesa-ro/r/api/api-service
WORKDIR /var/lib/ladesa-ro/r/api/api-service

CMD npm run migration:run && npm run start:prod
