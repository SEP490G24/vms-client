# 1. For build React app
FROM node:lts AS development
# Set working directory
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=8192"
#
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# Same as npm install
RUN npm install
COPY . /app
CMD [ "npm", "start" ]
FROM development AS build
RUN npm run build
# 2. For Nginx setup
FROM nginx:alpine
# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=build /app/.nginx/keycloak.template.json .
COPY --from=build /app/.nginx/runtime-config.template.js .
# Copy static assets from builder stage
COPY --from=build /app/dist .
# Containers run nginx with global directives and daemon off
#CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/keycloak.template.json > /usr/share/nginx/html/keycloak.json && envsubst < /usr/share/nginx/html/runtime-config.template.js > /usr/share/nginx/html/runtime-config.js && exec nginx -g 'daemon off;'"]
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/runtime-config.template.js > /usr/share/nginx/html/runtime-config.js && exec nginx -g 'daemon off;'"]
