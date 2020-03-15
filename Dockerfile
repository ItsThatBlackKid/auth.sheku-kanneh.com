FROM node:12.16.1-alpine

RUN mkdir -p /srv/auth/api

WORKDIR /srv/auth/api

COPY package*.json ./

RUN npm i -g npm-install-changed
RUN npm-install-changed

COPY . .

RUN npm run build

COPY --chown=sheku:sheku . .

EXPOSE 8080

CMD npm run start-build