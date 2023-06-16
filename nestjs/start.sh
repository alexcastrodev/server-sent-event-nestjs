#!/bin/bash

yarn

# yarn global add @nestjs/cli

# npx prisma generate

npx prisma migrate dev

yarn start

# tail -f /dev/null