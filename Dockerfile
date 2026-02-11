# Build Stage
FROM --platform=linux/amd64 node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html/rass
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html/rass

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
