package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"servease/internal/config"
	"servease/internal/database"
	"servease/internal/handlers"
	"servease/internal/middleware"
	"servease/internal/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize logger
	utils.InitLogger()

	// Load config
	config := config.LoadConfig()

	// Initialize database
	database.InitDB()

	router := gin.Default()

	// Add rate limiting
	router.Use(middleware.RateLimitMiddleware(10)) // 10 requests per second

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	// Initialize routes
	initializeRoutes(router)

	srv := &http.Server{
		Addr:    ":" + config.Port,
		Handler: router,
	}

	// Graceful shutdown
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			utils.Logger.Fatalf("listen: %s\n", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// Shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		utils.Logger.Fatal("Server forced to shutdown:", err)
	}
}

func initializeRoutes(router *gin.Engine) {
	api := router.Group("/api")

	// Health check route
	api.GET("/health", handlers.HealthCheck)

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
