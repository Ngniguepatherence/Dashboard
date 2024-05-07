FROM node:20 as build

# Set working directory

WORKDIR /Dashboard

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm instal

# Copy the rest of the application

COPY . .

# Build the react app
RUN npm run build

# Serve React application with nginx
FROM nginx:alpine


# Copy the build app from the build stage
COPY --from=build /Dashboard/build /usr/share/nginx/html

# Expose port 80

EXPOSE 80

# Command to start NGINX and serve the application
CMD [ "nginx", "-g", "daemon off;" ]