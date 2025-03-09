package models

import (
	"time"
)

type Booking struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	UserID     uint      `json:"user_id" gorm:"not null"`
	ServiceID  uint      `json:"service_id" gorm:"not null"`
	ProviderID uint      `json:"provider_id" gorm:"not null"`
	DateTime   time.Time `json:"date_time" gorm:"not null"`
	Status     string    `json:"status" gorm:"not null"` // pending, confirmed, completed, cancelled
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`

	User     User    `json:"user" gorm:"foreignKey:UserID"`
	Service  Service `json:"service" gorm:"foreignKey:ServiceID"`
	Provider User    `json:"provider" gorm:"foreignKey:ProviderID"`
}
