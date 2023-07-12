# Use the desired version of the Node.js runtime as the base image
FROM node:19.8.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Set the environment variable for the Node.js server
ENV PORT 3000

# Expose the specified port
EXPOSE $PORT

# Command to start the Node.js server
CMD [ "node", "app.js" ]
