FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm@9.10.0

RUN pnpm i 

RUN pnpm run optimize

COPY . .

RUN pnpm run build

EXPOSE 17027

CMD ["pnpm", "run", "dev"]