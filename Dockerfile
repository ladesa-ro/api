FROM node:21 as base
RUN apt update -y
RUN apt install -y git
WORKDIR /luna-container/luna-backend

FROM base as prod-deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev

FROM prod-deps as dev-deps
RUN npm install

FROM dev-deps as assets
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /luna-container/luna-backend /luna-container/luna-backend
WORKDIR /luna-container/luna-backend
CMD npm run db:migrate && npm run start:prod
