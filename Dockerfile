FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm@10.0.0

RUN pnpm i 

RUN pnpm run optimize

COPY . .

RUN pnpm run build

EXPOSE 17027

CMD ["pnpm", "run", "dev"]