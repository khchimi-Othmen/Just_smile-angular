# Stage 1: Build Angular application

# Use a lightweight Node.js image for the build
FROM node:16.13.0-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application source code
COPY . .

# Build the Angular application in production mode
RUN npm run build -- --prod

# Stage 2: Serve the application using Nginx

# Use a lightweight Nginx image
FROM nginx:1.25.3-alpine

# Copy the Angular build output to Nginx's html directory
COPY --from=build /app/dist/just_smile_ng /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 for the server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
