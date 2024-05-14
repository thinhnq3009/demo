FROM node:lts as dependencies
WORKDIR /dapp
COPY package.json yarn.lock ./
RUN yarn install

FROM node:lts as builder

WORKDIR /dapp
COPY . .
COPY --from=dependencies /dapp/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /dapp
ENV NODE_ENV development

# COPY --from=builder /dapp/next.config.js ./
COPY --from=builder /dapp/public ./public
COPY --from=builder /dapp/.next ./.next
COPY --from=builder /dapp/node_modules ./node_modules
COPY --from=builder /dapp/package.json ./package.json
COPY ./next.config.js ./next.config.js

EXPOSE 3000
CMD ["yarn", "start"]