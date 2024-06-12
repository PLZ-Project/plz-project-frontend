# Build stage
FROM node:latest AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:latest

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 81

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-l", "80"]