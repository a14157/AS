# Dockerfile for Node-RED - pulls latest master code from git
# Use the node.js v4 LTS engine
FROM node:4-slim

RUN mkdir -p /root/.node-red
WORKDIR /root/.node-red
 
# download latest stable node-red
RUN npm install -g --unsafe-perm node-red
RUN npm install -g --save node-red/node-red-dashboard node-red-contrib-web-worldmap node-red-node-random

# use external storage for the user directory
VOLUME /root/.node-red

# expose port
EXPOSE 1880
 
# Set the default command to execute
# when creating a new container
CMD ["node-red-pi","-v","--max-old-space-size=512","flow.json"]

# docker build --rm=true --tag=node-red .
# docker run -it -p 1880:1880 --name mynodered node-red 
# docker run -it -p 1880:1880 -v ~/data:/root/.node-red --name mynodered node-red