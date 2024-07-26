
# PETSHOP

## Project Overview

PETSHOP is an end-to-end (E2E) testing framework for a pet shop application using Cypress and Cypress-XPath. This project is designed to ensure that the pet shop application functions correctly and provides a seamless user experience.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop)

## Project Setup

1. **Clone the Repository:**

   git clone https://github.com/omkartaralekar/PetShop.git
   cd PETSHOP

2. **Install Dependencies:**

   If you prefer to run the tests locally without Docker, install the project dependencies using npm:
   npm install

3. **Run Cypress Tests Locally:**

   To run Cypress tests locally, use the following command:

   npx cypress run

## Docker Setup

Docker provides a consistent environment to run your Cypress tests. Follow these steps to set up and run Cypress tests using Docker:

1. **Create a Dockerfile:**

   Ensure you have a `Dockerfile` in the root of your project directory with the following content:

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

   # Define the command to run Cypress tests
   CMD ["npx", "cypress", "run"]

2. **Build the Docker Image:**

   Build the Docker image using the following command:

   docker build -t petshop-image .

3. **Run the Docker Container:**

   Use the following command to run the Docker container, replacing `E:\Project\PETSHOP` with the absolute path to your project directory:

   - **Command Prompt (cmd.exe):**

     docker run -it --rm -v E:\Project\PETSHOP:/app -w /app petshop-image

   - **PowerShell:**

     docker run -it --rm -v "E:/Project/PETSHOP:/app" -w /app petshop-image

## Project Structure

- `cypress/` - Contains Cypress configuration, test specs, fixtures, and support files.
- `cypress.json` - Cypress configuration file.
- `Dockerfile` - Dockerfile for building the Cypress testing environment.
- `package.json` - Project dependencies and scripts.

## Contributing

Feel free to submit issues, feature requests, or pull requests. Contributions are welcome!

Feel free to adjust any specific details or paths as needed for your project.