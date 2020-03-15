FROM node:12.16.1-alpine

RUN mkdir -p /srv/auth/api  && chown -R node:node /srv/auth/

WORKDIR /srv/auth/api

COPY package*.json ./
USER root

RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --production --silent \
 && apk del .build-deps

RUN npm install -g node-gyp
RUN npm i -g npm-install-changed
RUN npm i

COPY --chown=root:root . .

EXPOSE 8080

CMD npm run start