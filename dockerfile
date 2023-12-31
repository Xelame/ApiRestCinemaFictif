FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
COPY prisma ./prisma/ 

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]