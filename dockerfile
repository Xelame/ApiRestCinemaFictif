FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./

COPY prisma ./prisma

RUN bun install

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]