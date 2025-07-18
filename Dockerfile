FROM node:20-alpine as client

ARG PACKAGE_NAME=neuvestor
ARG PNPM_VERSION=10

WORKDIR /usr/app
COPY --chown=node:node ./ ./

# Install package manager
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

# Install dependencies
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

# Build the services
RUN pnpm run build:all:packages

# Build the frontend
RUN pnpm --filter ${PACKAGE_NAME} run build

# Create a new image with just the built files and then run server.js
FROM node:20-alpine

ARG BUILD_PATH=build

WORKDIR /usr/app/

# Copy over the build files into the server image
COPY --from=client /usr/app/${BUILD_PATH}/ ./${BUILD_PATH}/

WORKDIR /usr/app/server/

# Copy over the server files
COPY --chown=node:node server/ ./
COPY --chown=node:node .npmrc ./

RUN npm i

ENV PORT 3000
EXPOSE 3000

# Run the server as the node user
USER node
CMD ["npm", "start"]
