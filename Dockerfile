FROM node:18-buster AS base

FROM base AS builder

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm ci

FROM base AS source
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules/

COPY . /app/
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npx prisma db pull && npx prisma generate 
RUN npm run build

CMD ["npm", "start"]

# FROM base AS final
# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=source /app/public /app/public
# COPY --from=source --chown=nextjs:nodejs /app/.next ./.next

# USER nextjs

# ENV PORT 3000
# EXPOSE ${PORT}
# ENV NEXT_TELEMETRY_DISABLED 1
# ENV NODE_ENV production

# CMD ["npx", "--yes", "next", "start"]

