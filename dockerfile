# hadolint global ignore=DL3059
ARG DISTROLESS_NODE_VERSION=20
ARG DISTROLESS_NODE_OS=debian12
ARG NODE_OS=alpine
ARG NODE_VERSION=20.12.2

#  ================ DEVELOPMENT ============= 
FROM node:${NODE_VERSION}-${NODE_OS} AS development
WORKDIR /app
COPY ./package*.json .
RUN ["npm", "ci"]

COPY . .
RUN ["npm", "run", "build"]
EXPOSE 3001
USER node:node

# CMD ["sleep", "infinity"]
CMD ["npm", "run", "start:dev"]

# =============== BUILDER STAGE =================
FROM node:${NODE_VERSION}-${NODE_OS} AS builder 
WORKDIR /app
COPY --from=development /app/package*.json .
RUN ["npm", "pkg", "delete", "scripts.prepare"]
RUN ["npm", "pkg", "delete", "devDependencies"]
RUN ["npm", "ci", "--omit=dev"]
WORKDIR /app/build
COPY --from=development /app/build .
COPY --from=development /app/.env .
EXPOSE 3000
USER node:node

CMD ["sleep", "infinity"]
# CMD ["npm", "run", "start:prod"]

#  ========================== PRODUCTION  ======================
# hadolint ignore=DL3006
FROM gcr.io/distroless/nodejs${DISTROLESS_NODE_VERSION}-${DISTROLESS_NODE_OS} as production
WORKDIR /app
COPY --from=builder /app .
USER 1000
EXPOSE 3000
ARG DESC="Users service image"
ARG IMG_VERSION="1.0.0"
LABEL version=${IMG_VERSION}
LABEL description=${DESC}
WORKDIR /app/build

CMD ["infra/http/express/index.js"]