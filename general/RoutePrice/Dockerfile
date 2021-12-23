FROM node:17-alpine3.12
WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./

RUN npm install

COPY . .

EXPOSE 4500

CMD npm start