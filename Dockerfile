# Use the official Node.js 16 image as a base image for the Angular build
FROM node:16.13.0-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@14.2.13

# Install project dependencies
RUN npm ci

# Copy the rest of the application source code to the container
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Use the official Nginx image to serve the Angular application
FROM nginx:1.25.3

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/dist/just_smile_ng /usr/share/nginx/html

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
