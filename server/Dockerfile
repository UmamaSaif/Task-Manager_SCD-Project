FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./

RUN npm install

# Copy ALL backend files (note the .dockerignore may affect this)
COPY . .

# Explicitly expose the port your backend uses
EXPOSE 5000

# Correct the entry point to your server's index.js location
CMD ["node", "server/index.js"]