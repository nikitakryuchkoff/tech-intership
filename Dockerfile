FROM node:20

WORKDIR /app

COPY . .

RUN npm run build

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "prod"]
