# ServeEase - Home Services Marketplace

A modern platform connecting service providers with customers for home services. Built with Go (Gin) backend and React frontend.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git
- Node.js 20+ (for local development)
- Go 1.24+ (for local development)
- PostgreSQL 16+ (for local development)

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/servease.git
   cd servease
   ```

2. Environment Setup:

```bash
# Backend environment variables (already in docker-compose.yml)
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=servease
JWT_SECRET=your-secret-key-here
```

3. Start the application:

```bash
docker-compose up --build
```

4. Access the services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd backend
go mod download
go run cmd/server/main.go
```

## 🛠 Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

### Backend
- Go (Gin Framework)
- GORM for database operations
- JWT for authentication
- PostgreSQL database
- Rate limiting
- Graceful shutdown

## 📁 Project Structure

```bash
.
├── backend/
│   ├── cmd/
│   │   └── server/          # Application entry point
│   │   ├── internal/
│   │   │   ├── api/            # API routes
│   │   │   ├── config/         # Configuration
│   │   │   ├── database/       # Database connection
│   │   │   ├── handlers/       # Request handlers
│   │   │   ├── middleware/     # Middleware functions
│   │   │   ├── models/         # Data models
│   │   │   └── utils/          # Utilities
│   │   └── Dockerfile
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/     # Reusable components
│       │   ├── context/        # React context
│       │   ├── pages/          # Page components
│       │   └── services/       # API services
│       └── Dockerfile
└── docker-compose.yml
```

## 🔑 Features

- User Authentication (JWT)
- Service Provider Registration
- Service Listing and Filtering
- Booking Management
- Responsive Design
- Rate Limiting
- Error Handling
- Database Migrations
- Secure Password Hashing
- Input Validation

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting for API endpoints
- Input validation and sanitization
- Secure HTTP headers
- CORS configuration

## 📝 API Documentation

### Authentication Endpoints
- POST /api/register - User registration
- POST /api/login - User login

### Service Endpoints
- GET /api/services - List all services
- POST /api/services - Create new service (providers only)

### Booking Endpoints
- POST /api/bookings - Create booking
- GET /api/bookings - Get user bookings

### Provider Endpoints
- GET /api/providers - List all providers
- GET /api/providers/:id - Get provider profile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
