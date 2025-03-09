package models

import (
	"time"
)

type BookingRequest struct {
	ServiceID  uint      `json:"service_id" binding:"required"`
	DateTime   time.Time `json:"date_time" binding:"required,future"`
	ProviderID uint      `json:"provider_id" binding:"required"`
}

type ServiceFilterRequest struct {
	Category    string  `form:"category"`
	MinPrice    float64 `form:"min_price"`
	MaxPrice    float64 `form:"max_price"`
	ProviderID  uint    `form:"provider_id"`
} 