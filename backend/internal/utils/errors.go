package utils

type APIError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewAPIError(code int, message string) *APIError {
	return &APIError{
		Code:    code,
		Message: message,
	}
} 