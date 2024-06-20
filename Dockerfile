FROM node:16.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm cache clean --force
RUN npm install

COPY . .


RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]