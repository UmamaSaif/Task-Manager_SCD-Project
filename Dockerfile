# frontend/Dockerfile
FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Expose frontend port (assuming Vite runs on 3000)
EXPOSE 5173

# Command to run the frontend
CMD ["npm", "run", "dev"]