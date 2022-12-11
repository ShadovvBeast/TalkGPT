FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build

FROM node:18-alpine
ENV PORT=4000
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE ${PORT}
CMD node --es-module-specifier-resolution=node --max-old-space-size=9096 dist/index