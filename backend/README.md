# Laravel Product Management Backend

This repository contains the backend of a product management system built with Laravel. It provides RESTful API endpoints for managing products, including adding, updating, and deleting products.

## Table of Contents

-   [Overview](#overview)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running Migrations](#running-migrations)
-   [Running the Server](#running-the-server)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)

## Overview

This Laravel backend serves as the server-side component of a product management system. It handles CRUD operations for products and serves data to the frontend application.

## Prerequisites

Before you begin, ensure you have the following software installed:

-   [PHP](https://www.php.net/) (>= 8.0)
-   [Composer](https://getcomposer.org/)
-   [MySQL](https://www.mysql.com/) or another compatible database

## Installation

1. **Clone the repository**

    ```bash
    git clone <https://github.com/royhanmh/project-product>
    cd backend
    ```

2. **Install dependencies**

    ```bash
    composer install
    ```

## Configuration

1. **Set up environment variables**

    Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file to configure your database connection and other environment variables:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_user
    DB_PASSWORD=your_database_password
    ```

2. **Generate application key**

    ```bash
    php artisan key:generate
    ```

## Running Migrations

Run the migrations to set up the database schema:

```bash
php artisan migrate
```

## Running the Server

Start the Laravel development server:

```bash
php artisan serve
```

By default, the server will run at `http://localhost:8000`. You can access the API endpoints from this URL.

## API Endpoints

Here are some of the key API endpoints available:

-   **GET /products** - Retrieve a list of products.
-   **GET /products/{id}** - Retrieve a specific product by ID.
-   **POST /products** - Create a new product.
-   **PUT /products/{id}** - Update an existing product.
-   **DELETE /products/{id}** - Delete a product by ID.

## Contributing

Contributions are welcome! Please submit a pull request with your changes. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
