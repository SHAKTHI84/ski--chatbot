# Use Node.js as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port for the frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
