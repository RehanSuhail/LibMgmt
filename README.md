# 📚 Library Management System

A full-stack Library Management application built with **ASP.NET Core Web API** (.NET 8) for the backend and **Angular 21** for the frontend.

## 📖 Overview

This application allows users to manage libraries and books through a clean, responsive web interface. It includes authentication guards, CRUD operations for both libraries and books, and an admin panel.


## ⚙️ Tech Stack

### Backend — `LibMgmtAPI`
- **Framework:** ASP.NET Core 8 Web API
- **Database:** SQL Server (LocalDB)
- **ORM:** ADO.NET (raw SQL via `Microsoft.Data.SqlClient`)
- **API Docs:** Swagger / Swashbuckle
- **Architecture:** Controller → Interface → Service → DbHelper

### Frontend — `LibMgmtApp`
- **Framework:** Angular 21 (Standalone Components)
- **Styling:** Bootstrap 5 + Bootstrap Icons
- **Routing:** Angular Router with Auth Guards
- **HTTP:** Angular HttpClient + RxJS

## 🗄️ Database Setup

1. Open SQL Server Management Studio (or any SQL client connected to LocalDB).
2. Run the SQL scripts found in [`SQlQueries/SqlQueries.txt`](SQlQueries/SqlQueries.txt) in order:
   - Create the `LibMgmtDb` database
   - Create `Libraries` table
   - Create `Books` table (with FK to Libraries)
   - Insert sample data

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.dev/) (`npm install -g @angular/cli`)
- SQL Server LocalDB (included with Visual Studio)

### Backend Setup

```bash
cd LibMgmtAPI

# Restore dependencies
dotnet restore

# Configure connection string
# Copy appsettings.json and create appsettings.Development.json with your connection string:
# "ConnectionStrings": {
#   "LibMgmtConnection": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=LibMgmtDb;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;"
# }

# Run the API
dotnet run
```

The API will be available at **http://localhost:5195** with Swagger UI at `/swagger`.

### Frontend Setup

```bash
cd LibMgmtApp

# Install dependencies
npm install

# Start the dev server
ng serve
```

The app will be available at **http://localhost:4200**.

## 📡 API Endpoints

### Libraries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/library/getalllibraries` | Get all libraries |
| GET | `/api/library/getlibrarybyid/{id}` | Get library by ID |
| GET | `/api/library/findlibrarybyname/{name}` | Search libraries by name |
| POST | `/api/library/addlibrary` | Add a new library |
| PUT | `/api/library/updatelibrary/{id}` | Update a library |
| DELETE | `/api/library/deletelibrary/{id}` | Delete a library |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/book/getallbooks` | Get all books |
| GET | `/api/book/getbookbyid/{id}` | Get book by ID |
| GET | `/api/book/findbookbyname/{name}` | Search books by name |
| POST | `/api/book/addbook` | Add a new book |
| PUT | `/api/book/updatebook/{id}` | Update a book |
| DELETE | `/api/book/deletebook/{id}` | Delete a book |



