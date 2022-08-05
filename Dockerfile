FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build
RUN npm install -g serve


EXPOSE 3000


CMD [ "serve", "-s", "build" ]

