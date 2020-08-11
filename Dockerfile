FROM node:12.4-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install && mv node_modules /node_modules
COPY . .
RUN npm install pm2 -g
CMD ["pm2-runtime", "index.js"]

