# Nexa Selection Test Project 1: Admin Panel Website (API)

Hello, **I'm Muhammad Farhan**.

This project is part of the selection test for the web programmer position at PT Internet Mulia Untuk Negeri (NEXA). I built this API for support [admin-panel](https://github.com/muhammadfarhan19/NEXA-admin-panel) web.

## Technologies Used

- **TypeScript**
- **Express.js**
- **MySQL**

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/muhammadfarhan19/NEXA-admin-panel-be
   ```

2. Navigate to the project directory:

   ```sh
   cd NEXA-admin-panel-be
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Create a tables
    ```sh
    src/migration/migrate for SQL Syntax Migration
    ```

### Running the Project

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

You should see the responsive design in action.

## Routes Structure

- `/barang` - GET barang list.
- `/insert/barang` - POST barang.
- `/update/barang` - PUT barang.
- `/delete/barang` - DEL barang.

- `/customers`, GET Customers list;
- `/insert/customers`, POST Customer;

- `/counter/:tanggal_transaksi`, GET Counter for transaction code;

- `/home-transaction`, GET All transactions;
- `/insert/home-transaction`, POST transaction;

- `/detail-transaction`, GET Detail transactions;
- `/insert/detail-transaction`, POST transaction;
