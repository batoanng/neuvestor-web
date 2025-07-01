# Common Dockerfile for all schemes.
FROM node:20-alpine as client

ARG PNPM_VERSION=9.0.6
ARG CONFIG_FOLDER_NAME
ARG PUBLIC_URL

RUN echo "CONFIG_FOLDER_NAME: ${CONFIG_FOLDER_NAME}"
RUN echo "PUBLIC_URL: ${PUBLIC_URL}"

WORKDIR /usr/src/app
COPY --chown=node:node package.json pnpm-lock.yaml .npmrc ./

# Install package manager
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

# Install dependencies
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

COPY --chown=node:node . ./

# PROJECT is required for config-overrides.js to retrieve the correct .env files to create corresponding config files for.
ENV PROJECT ${CONFIG_FOLDER_NAME}
# PUBLIC_URL is used by webpack to prefix built resource URLs. We could use the homepage setting in package.json,
# but then we'd need a different package.json per scheme.
ENV PUBLIC_URL /${PUBLIC_URL}
RUN pnpm build

FROM node:20-alpine

ARG PNPM_VERSION=9.0.6
ARG CONFIG_FOLDER_NAME

WORKDIR /usr/app/

COPY --from=client --chown=node:node /usr/src/app/build/ ./build/

WORKDIR /usr/app/server/

# Setting PROJECT here for the copy below it
ENV PROJECT ${CONFIG_FOLDER_NAME}
COPY --chown=node:node .npmrc server/ ./
COPY --chown=node:node config/$CONFIG_FOLDER_NAME/server/.env* ./

# Install package manager
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

# Install dependencies
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --force \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

ENV PORT 3000
EXPOSE 3000

USER node
CMD ["pnpm", "start"]
