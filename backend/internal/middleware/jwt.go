package middleware

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"servease/internal/config"
)

var jwtSecret []byte

func InitJWTSecret(config *config.Config) {
	jwtSecret = []byte(config.JWTSecret)
}

func GenerateToken(userID uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	return token.SignedString(jwtSecret)
}
