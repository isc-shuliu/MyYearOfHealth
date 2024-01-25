FROM node:18-alpine as build-step

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine

RUN npm install -g serve
COPY --from=build-step /app/dist .
EXPOSE 4200
CMD ["serve", "-s", "/app/browser", "-p", "4200"]