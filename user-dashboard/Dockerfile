FROM node:14-alpine as build

WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
RUN ng build
CMD ng serve --host 0.0.0.0 --port 3000