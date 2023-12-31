FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./

COPY prisma ./prisma

RUN bun install
RUN bunx prisma db pull --force
RUN bunx prisma generate

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]