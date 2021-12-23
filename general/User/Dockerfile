FROM node:17-alpine3.12
WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start