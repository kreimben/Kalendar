FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build
RUN npm i -g serve

EXPOSE 8000

WORKDIR /app/build

CMD ["serve", "-l", "8000"]