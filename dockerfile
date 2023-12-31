FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./

RUN bun install --production

RUN bunx prisma generate

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]