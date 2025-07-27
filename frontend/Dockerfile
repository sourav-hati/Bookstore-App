# Use Node 18 as the base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy everything into the container
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the static build using serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
