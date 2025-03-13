package handlers

import (
	"net/http"

	"servease/internal/database"
	"servease/internal/models"
	"servease/internal/utils"

	"github.com/gin-gonic/gin"
)

type CreateServiceRequest struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description"`
	Category    string  `json:"category" binding:"required"`
	BasePrice   float64 `json:"base_price" binding:"required,min=0"`
}

func GetServices(c *gin.Context) {
	utils.Logger.Printf("Fetching services")
	
	var services []models.Service
	result := database.DB.Preload("Provider").Find(&services)
	if result.Error != nil {
		utils.Logger.Printf("Error fetching services: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch services"})
		return
	}

	// Return services even if empty
	if len(services) == 0 {
		c.JSON(http.StatusOK, []models.Service{})
		return
	}

	c.JSON(http.StatusOK, services)
}

func CreateService(c *gin.Context) {
	var req CreateServiceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get provider ID from JWT token
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	service := models.Service{
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		BasePrice:   req.BasePrice,
		ProviderID:  userID.(uint),
	}

	if err := database.DB.Create(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create service"})
		return
	}

	c.JSON(http.StatusCreated, service)
}

func GetProviders(c *gin.Context) {
	var providers []models.User
	result := database.DB.Where("role = ?", "provider").Find(&providers)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch providers"})
		return
	}

	c.JSON(http.StatusOK, providers)
}

func GetProviderProfile(c *gin.Context) {
	providerID := c.Param("id")

	var provider models.User
	var services []models.Service

	// Get provider details
	if err := database.DB.First(&provider, providerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Provider not found"})
		return
	}

	// Get provider's services
	if err := database.DB.Where("provider_id = ?", providerID).Find(&services).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch provider services"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"provider": provider,
		"services": services,
	})
}

func CreateBooking(c *gin.Context) {
	var booking models.Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user ID from JWT token
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	booking.UserID = userID.(uint)
	booking.Status = "pending"

	if err := database.DB.Create(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
		return
	}

	c.JSON(http.StatusCreated, booking)
}

func GetUserBookings(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var bookings []models.Booking
	result := database.DB.
		Preload("Service").
		Preload("Provider").
		Where("user_id = ?", userID).
		Find(&bookings)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch bookings"})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
