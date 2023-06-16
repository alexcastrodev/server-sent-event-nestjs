# Project Name: Server Sent Event Implementation with Express and NestJS

## Description
This project provides a step-by-step guide on how to implement a simple Server Sent Event (SSE) using two popular Node.js frameworks: Express and NestJS. SSE is a technology that enables a server to push real-time updates to the client, allowing for a bi-directional communication channel over a single HTTP connection.

SSE is a alternative for websocket, but it works only in one way, the server can send messages to the client, but the client can't send messages to the server.

### Websocket
<img src="./.github/websocket.png" alt='websocket' />

### Server Sent Event

<img src="./.github/sse.png" alt='sse' />

## Explanation

First, i created the express simple example to check the SSE implementation, then i created the nestjs example to check the SSE implementation.

<img src="./.github/events.png" alt='express-implementation' />

## Getting Started
Follow the steps below to set up and run the project:

1. Clone the repository:

```bash
git clone https://github.com/AlexcastroDev/server-sent-event-nestjs
```

2. Change into the project directory:

```bash
cd express
```

or 

```bash
cd nestjs
```

3. Install the dependencies:

```bash
npm install
```

# NestJS

# Installation

```bash
docker-compose up -d
```

it will create 3 containers:

- nestjs: the nestjs application
- redis: the redis server
- mysql: the mysql server

# Install dependencies

```bash
~ docker exec -it nestjs-app-1 bash
~ npx prisma generate
~ npx prisma migrate dev
~ yarn start:dev
```

# Running the app

```bash
~ yarn start:dev
```

# Pending

- [ ] Fix dockerfile

I have this dockerfile, it install modules in container, but not locally.

I want to install modules locally, because i want the auto complete in my IDE.

```dockerfile
FROM node:lts-slim

# Install dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /home/node/app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Generate Prisma client
RUN yarn prisma generate

# Build the application
RUN yarn build

# Expose the port
EXPOSE 3000

# Set the entrypoint command
CMD ["yarn", "start"]
```

- [ ] Check hot reload
