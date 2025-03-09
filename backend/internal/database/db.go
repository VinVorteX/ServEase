package database

import (
	"fmt"
	"log"

	"servease/internal/config"
	"servease/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	config := config.LoadConfig()
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable",
		config.DBHost,
		config.DBUser,
		config.DBPassword,
		config.DBName,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Run migrations
	err = db.AutoMigrate(
		&models.User{},
		&models.Service{},
		&models.Booking{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = db
}
