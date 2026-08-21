# syntax=docker/dockerfile:1

###############################################################################
# base — pinned digest-free but version-locked Alpine image, non-root by default
###############################################################################
FROM node:22-alpine AS base
ENV NODE_ENV=development \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT_LEVEL=high
WORKDIR /app
# node:alpine already ships an unprivileged `node` user (uid 1000).
RUN chown -R node:node /app

###############################################################################
# deps — install into the image, never onto the Windows host
###############################################################################
FROM base AS deps
COPY --chown=node:node package.json package-lock.json ./
USER node
# `npm ci` not `npm install`: it installs exactly what the lockfile pins and
# fails loudly if the lockfile and package.json have drifted apart, so an image
# built next month resolves to the same tree as one built today.
RUN npm ci --no-audit --no-fund

###############################################################################
# dev — the container you actually work in. Source is bind-mounted over /app,
#       node_modules is kept as a container-only volume so host and container
#       never share compiled native binaries.
###############################################################################
FROM base AS dev
COPY --from=deps --chown=node:node /app/node_modules /app/node_modules
COPY --chown=node:node . .
USER node
EXPOSE 5173
CMD ["npm", "run", "dev"]

###############################################################################
# build — produce static assets
###############################################################################
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps --chown=node:node /app/node_modules /app/node_modules
COPY --chown=node:node . .
USER node
RUN npm run build

###############################################################################
# prod — nginx serving the static bundle, unprivileged
###############################################################################
FROM nginxinc/nginx-unprivileged:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf            /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/conf.d/security-headers.conf
EXPOSE 8080
