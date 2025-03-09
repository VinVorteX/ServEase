package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	api := r.Group("/api")
	api.GET("/health", HealthCheck)
	api.POST("/register", Register)
	api.POST("/login", Login)
	return r
}

func TestHealthCheck(t *testing.T) {
	router := setupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/health", nil)
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %v", w.Code)
	}

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	if response["status"] != "ok" {
		t.Errorf("Expected status 'ok', got %v", response["status"])
	}
}
