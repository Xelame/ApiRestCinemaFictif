FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
COPY prisma ./prisma/ 

RUN bun install
COPY . .

ENV NODE_ENV production

RUN bunx prisma generate 

RUN bun install

CMD [ "bun", "start" ]