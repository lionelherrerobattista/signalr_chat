FROM node:24-alpine AS build

WORKDIR /app

COPY package\*.json ./

# run cleaner install

RUN npm ci --only=production=false

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/signalr-chat/browser /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
