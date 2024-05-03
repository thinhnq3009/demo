FROM node:lts as dependencies
WORKDIR /cms
COPY package.json yarn.lock ./
RUN yarn install

FROM node:lts as builder

WORKDIR /cms
COPY . .
COPY --from=dependencies /cms/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /cms
ENV NODE_ENV development

COPY --from=builder /cms/next.config.js ./
COPY --from=builder /cms/public ./public
COPY --from=builder /cms/.next ./.next
COPY --from=builder /cms/node_modules ./node_modules
COPY --from=builder /cms/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]