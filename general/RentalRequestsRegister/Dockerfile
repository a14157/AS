FROM node:17-alpine3.12
WORKDIR /usr/src/app

COPY package*.json ./
COPY rentRegister.js ./

RUN npm install

COPY . .

EXPOSE 6000

CMD npm start