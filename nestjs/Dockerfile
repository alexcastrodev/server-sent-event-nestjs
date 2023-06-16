# Build the application
FROM arm64v8/node:18

RUN apt-get update && \
    apt-get install -y wget && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

RUN usermod -u 501 node

USER node

WORKDIR /home/node/app

EXPOSE 3000


