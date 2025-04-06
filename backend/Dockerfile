FROM node:22-slim
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
