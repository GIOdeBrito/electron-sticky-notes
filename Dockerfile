# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the source code into the container
COPY ./app .

# COPY . ./

# Builds the electron app
RUN npm run build

# Clean unnecessary files
RUN npm prune --production

EXPOSE 8080

# Freezes the container so it is not suddenly stopped
CMD ["sleep", "infinity"]