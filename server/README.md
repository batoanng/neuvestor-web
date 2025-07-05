# Server

## About

This server file is used both serve the production site but also to proxy the API calls to the backend. This is done to
avoid CORS issues.

## How to use

You must create a `.env.server.development` file with the variables populated from the example file. Then you can cd
into the folder and run `pnpm run start` to run the server.

In development you don't run the frontend off the server you can simply run `npm start`, you still need to run
the server as this will handle the proxy to get around the CORS issues. It's only in production that it will serve the
frontend.

## How to run docker image

The docker image is housed in the root of the mono repo with the following command you can run the image

- build: ` docker build -f Dockerfile.neuvestor-web . `
- run: `docker run -p 3000:3000 neuvestor-web`
