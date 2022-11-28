FROM node:18
WORKDIR /usr/buscapets

COPY ./package.json .
RUN yarn
COPY ./tsconfig.json .
COPY ./nest-cli.json .