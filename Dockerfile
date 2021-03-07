FROM node:14
MAINTAINER k252438@gmail.com
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node","server.js"]
