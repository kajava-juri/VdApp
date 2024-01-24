FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json package-lock.json .env ./

FROM base AS build
RUN export NODE_ENV=production
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

FROM base as prod-build

RUN npm install --production
COPY prisma prisma
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

EXPOSE 5435
EXPOSE 80
EXPOSE 3000
CMD ["npm", "run" , "start"]