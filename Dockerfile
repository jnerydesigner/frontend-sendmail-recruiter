FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]