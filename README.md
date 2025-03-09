# ServeEase - Home Services Marketplace

A modern platform connecting service providers with customers for home services.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/servease.git
   cd servease
   ```

2. Start the application:

```bash
docker-compose up --build
```

3. Access the services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432

## 🛠 Tech Stack

- Frontend: React
- Backend: Go (Gin Framework)
- Database: PostgreSQL

## 📁 Project Structure

```bash
.
├── backend/         # Go backend service
├── frontend/        # React frontend
└── docker-compose.yml
```

## 🔑 Environment Variables

### Backend

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME

### Database

- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
