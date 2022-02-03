FROM node:12
FROM cypress/base:10

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG HOST
ENV HOST=$HOST
RUN echo "HOST: $HOST"

RUN npx cypress run --env host=$HOST --config --spec **/*.spec.js
#- docker build -t cypress-image:1.0.0 --build-arg HOST=host.