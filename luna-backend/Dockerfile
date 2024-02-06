FROM node:18 as base
RUN apt update -y
RUN apt install -y git
WORKDIR /luna/luna-backend

FROM base as prod-deps
COPY package.json .npmrc package-lock.json ./
RUN npm install --omit=dev

FROM prod-deps as dev-deps
RUN npm install

FROM dev-deps as assets
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /luna/luna-backend /luna/luna-backend
WORKDIR /luna/luna-backend
CMD npm run db:migrate && npm run seed:run && npm run start:prod
