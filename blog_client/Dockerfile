# билд
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # => build/client и build/server

# рантайм
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules

# копируем сервер и клиентскую статику
COPY --from=build /app/build/server ./build/server
COPY --from=build /app/build/client ./build/client

EXPOSE 3000
CMD ["npm","run","start"]
