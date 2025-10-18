# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create web directory if it doesn't exist
RUN mkdir -p web

# Expose port 3000
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Install Python3 and curl for healthcheck
RUN apk add --no-cache python3 curl

# Start the web server
CMD ["python3", "-m", "http.server", "3000", "--directory", "web"]
