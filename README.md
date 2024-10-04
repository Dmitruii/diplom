# Diplom

## Overview

This project consists of two main parts:

- **Admin (Directus server)**: This is the backend powered by Directus.
- **Client**: The frontend of the project.

Follow the instructions below to get both the server and client running.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version >= 14.x)
- **npm** (version >= 6.x)

---

## How to Start the Server (Admin)

To run the Directus server, follow these steps:

1. Open your terminal.
2. Navigate to the `admin` directory:
   ```bash
   cd admin
   ```
3. Install the necessary dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the Directus server using the following command:
   ```bash
   npx directus start
   ```
5. The server should now be running. You can access the Directus admin panel by visiting:
   ```
   http://0.0.0.0:8055
   ```
   or
   ```
   http://localhost:8055
   ```

---

## How to Start the Client

To run the frontend (client), follow these steps:

1. Open a new terminal window.
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Install the necessary dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the client development server:
   ```bash
   npm run dev
   ```
5. The client should now be running. By default, you can access the client at:
   ```
   http://localhost:3000
   ```

---

## License

This project is licensed under the [MIT License](LICENSE).
