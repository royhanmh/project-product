# Product CRUD

A product CRUD that includes functionalities for adding, editing, and deleting products. This project consists of both backend and frontend components.

## Table of Contents

- [Overview](#overview)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is designed to manage a list of products. It includes a backend built with Laravel and a frontend built with React. The backend provides RESTful API endpoints for managing products, while the frontend offers an interactive user interface for interacting with these endpoints.

## Backend Setup

The backend is built using Laravel. To set up the backend, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/royhanmh/project-product
   cd backend
   ```

2. **Install dependencies**

   Make sure you have [Composer](https://getcomposer.org/) installed. Then run:

   ```bash
   composer install
   ```

3. **Set up environment variables**

   Copy the `.env.example` file to a new file named `.env` and configure the environment variables as needed:

   ```bash
   cp .env.example .env
   ```

4. **Generate application key**

   ```bash
   php artisan key:generate
   ```

5. **Run migrations**

   ```bash
   php artisan migrate
   ```

6. **Start the server**

   ```bash
   php artisan serve
   ```

   The backend server will be running at `http://localhost:8000`.

## Frontend Setup

The frontend is built using React. To set up the frontend, follow these steps:

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:

   ```bash
   npm install
   ```

3. **Configure API endpoint**

   Ensure that the API endpoint in your frontend code matches the backend server URL.

4. **Start the development server**

   ```bash
   npm start
   ```

   The frontend server will be running at `http://localhost:5173`

## Usage

Once both the backend and frontend servers are running, you can access the application. You will be able to add, edit, and delete products via the user interface.

## Contributing

Contributions are welcome! Please submit a pull request with your changes. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
