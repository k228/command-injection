FROM node:16-alpine

RUN apk --no-cache add zip

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "node" ,"server.js"  ]