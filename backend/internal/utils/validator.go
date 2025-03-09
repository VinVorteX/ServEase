package utils

import (
	"github.com/go-playground/validator/v10"
	"time"
)

func RegisterValidators(v *validator.Validate) {
	v.RegisterValidation("future", validateFutureDate)
}

func validateFutureDate(fl validator.FieldLevel) bool {
	date, ok := fl.Field().Interface().(time.Time)
	if !ok {
		return false
	}
	return date.After(time.Now())
} 