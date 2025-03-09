package models

type Service struct {
	ID          uint    `json:"id" gorm:"primaryKey"`
	Name        string  `json:"name" gorm:"not null"`
	Description string  `json:"description"`
	Category    string  `json:"category" gorm:"not null"`
	BasePrice   float64 `json:"base_price" gorm:"not null"`
	ProviderID  uint    `json:"provider_id" gorm:"not null"`
	Provider    User    `json:"provider" gorm:"foreignKey:ProviderID"`
}
