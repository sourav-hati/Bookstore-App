
# Dockerfile for the backend of the Bookstore project
FROM node:latest
WORKDIR /app

# Only copy files inside the backend folder
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
