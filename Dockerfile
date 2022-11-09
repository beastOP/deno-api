FROM denoland/deno:latest as base
EXPOSE 8000

WORKDIR /app

COPY . ./

RUN deno cache server.ts

ENV MONGO_URI='mongodb://localhost:27017'

ENTRYPOINT [ "deno" ]

CMD ["run", "--allow-all", "server.ts"]