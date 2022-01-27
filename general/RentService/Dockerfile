FROM node:17-alpine3.12
WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./

RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 3500

ENTRYPOINT ["nodemon", "/usr/src/app/index.js"]