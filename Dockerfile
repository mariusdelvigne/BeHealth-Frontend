FROM node:20-alpine AS node
RUN ["npm", "i", "-g", "@angular/cli"]

WORKDIR /app
COPY *.json .
RUN ["npm", "install"]

COPY ./src ./src
RUN ["ng", "build"]

FROM nginx:alpine AS nginx
EXPOSE 80
COPY --from=node /app/dist/* /usr/share/nginx/html
RUN mv /usr/share/nginx/html/browser/* /usr/share/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]