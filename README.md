# ServeEase - Home Services Marketplace

A modern platform connecting service providers with customers for home services. Built with Go (Gin) backend and React frontend.

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- Go 1.24+ (for local development)
- PostgreSQL 16+ (for local development)

### Running with Docker
```bash
# Start all services
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Local Development

1. Start PostgreSQL:
```bash
docker run --name servease-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=servease -p 5432:5432 -d postgres
```

2. Start Backend:
```bash
cd backend
go mod download
go run cmd/server/main.go
```

3. Start Frontend:
```bash
cd frontend
npm install
npm start
```

## Features

- User Authentication (JWT)
- Service Provider Registration
- Service Listings with Categories
- Real-time Service Booking
- Provider Profiles
- Rate Limiting
- CORS Support

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- TailwindCSS
- Context API

### Backend
- Go (Gin Framework)
- GORM with PostgreSQL
- JWT Authentication
- Rate Limiting
- Graceful Shutdown

## Project Structure
```
.
├── backend/
│   ├── cmd/server/         # Entry point
│   └── internal/           # Internal packages
│       ├── handlers/       # Request handlers
│       ├── middleware/     # Middleware
│       ├── models/         # Data models
│       └── database/       # DB connection
├── frontend/
│   └── src/
│       ├── components/     # React components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── context/       # React context
└── docker-compose.yml
```

## API Endpoints

### Auth
- POST /api/register - Register user
- POST /api/login - Login user

### Services
- GET /api/services - List services
- POST /api/services - Create service

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings - Get user bookings

## License
MIT
