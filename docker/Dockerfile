ARG PORT=3000

# ================================
# Stage 1: Builder
# ================================
FROM node:25-alpine3.22 AS builder

WORKDIR /app

# Copy the Yarn files
COPY .yarnrc.yml package.json yarn.lock vite.config.ts ./
# Copy the Yarn files
COPY .yarn ./.yarn
# Copy the source code
COPY src ./src

# Install dependencies
RUN yarn install \
# Build the application
&& yarn build

# ================================
# Stage 2: Production
# ================================
FROM node:25-alpine3.22 AS production

ARG PORT

WORKDIR /app

# Copy the necessary files from the builder
COPY --from=builder /app/dist ./dist

# Copy the Yarn files
COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases

# Use node-modules linker instead of PnP
RUN yarn config set nodeLinker node-modules \
# Install only production dependencies
&& yarn workspaces focus --production \
# Clean up the yarn cache
&& yarn cache clean \
# Clean up unnecessary files to reduce image size
&& rm -rf .yarn .yarnrc.yml package.json yarn.lock

# Override some config defaults with values that will work better for docker
ENV NODE_ENV=production \
PORT=${PORT}

EXPOSE ${PORT}

CMD ["node", "dist/server/index.mjs"]
