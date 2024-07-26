# Use the official Cypress Docker image
FROM cypress/included:13.13.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Give Cypress permissions to run
RUN npx cypress verify

# Define the command to run Cypress tests
CMD ["npx", "cypress", "run"]
