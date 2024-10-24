FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Use lightweight http server
FROM node:20-alpine

# Install serve
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist /app

WORKDIR /app

# Expose default serve port
EXPOSE 3000

# Start serve
CMD ["serve", "-s", ".", "-l", "3000"]