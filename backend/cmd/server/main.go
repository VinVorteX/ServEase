package main

import (
	"log"

	"servease/internal/handlers"
	"servease/internal/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	// Initialize routes
	initializeRoutes(router)

	// Start server
	log.Fatal(router.Run(":8080"))
}

func initializeRoutes(router *gin.Engine) {
	api := router.Group("/api")

	// Auth routes
	api.POST("/register", handlers.Register)
	api.POST("/login", handlers.Login)

	// Protected routes
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// Services
		protected.GET("/services", handlers.GetServices)
		protected.POST("/services", handlers.CreateService)

		// Bookings
		protected.POST("/bookings", handlers.CreateBooking)
		protected.GET("/bookings", handlers.GetUserBookings)

		// Providers
		protected.GET("/providers", handlers.GetProviders)
		protected.GET("/providers/:id", handlers.GetProviderProfile)
	}
}
