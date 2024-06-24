# Use the official Node.js image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code to work directory
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
