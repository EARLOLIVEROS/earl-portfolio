FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN chmod +x node_modules/.bin/ng
COPY . .
RUN node_modules/.bin/ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/portfolio-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80