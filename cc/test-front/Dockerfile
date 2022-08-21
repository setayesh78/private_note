FROM node:alpine
RUN npm install --global http-server
RUN mkdir -p /app
WORKDIR  /app
COPY . .
CMD http-server /app -p 80