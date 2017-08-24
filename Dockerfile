FROM node:7.10.0
EXPOSE 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV DOCKER true
COPY package.json /usr/src/app/
RUN npm install && npm cache clean
COPY . /usr/src/app
RUN npm run build:prod

CMD npm run start:prod
