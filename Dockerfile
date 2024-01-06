# build environment
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./

ARG APP_BUILD=production
ENV APP_BUILD=${APP_BUILD}

RUN yarn build:${APP_BUILD}

# production environment
FROM nginx:stable-alpine
RUN pwd
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
