# Build the dependencies
FROM arm64v8/node:18-alpine AS dependencies

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

# Build the application
FROM arm64v8/node:18-alpine AS development

WORKDIR /home/node/app

RUN yarn global add @nestjs/cli

COPY --from=dependencies /home/node/app/node_modules ./node_modules

COPY . .

RUN yarn prisma generate

RUN yarn migrate:dev

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

