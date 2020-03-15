FROM node:13.2.0-alpine

RUN mkdir -p /srv/auth/api  && chown -R node:node /srv/auth/

WORKDIR /srv/auth/api

COPY package*.json ./
USER root

RUN npm i -g npm-install-changed
RUN npm-install-changed

COPY --chown=root:root . .

EXPOSE 8080

CMD npm run start