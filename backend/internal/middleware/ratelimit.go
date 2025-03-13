package middleware

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"net/http"
	"sync"
)

// IPRateLimiter stores rate limiters for different IPs
type IPRateLimiter struct {
	ips map[string]*rate.Limiter
	mu  *sync.RWMutex
	r   rate.Limit
	b   int
}

func NewIPRateLimiter(r rate.Limit, b int) *IPRateLimiter {
	return &IPRateLimiter{
		ips: make(map[string]*rate.Limiter),
		mu:  &sync.RWMutex{},
		r:   r,
		b:   b,
	}
}

func (i *IPRateLimiter) getLimiter(ip string) *rate.Limiter {
	i.mu.Lock()
	defer i.mu.Unlock()

	limiter, exists := i.ips[ip]
	if !exists {
		limiter = rate.NewLimiter(i.r, i.b)
		i.ips[ip] = limiter
	}

	return limiter
}

func RateLimitMiddleware() gin.HandlerFunc {
	// Allow 20 requests per minute with burst of 5
	limiter := NewIPRateLimiter(rate.Limit(20/60.0), 5)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		if !limiter.getLimiter(ip).Allow() {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error":       "Too many requests, please try again later",
				"retry_after": "60 seconds",
			})
			c.Abort()
			return
		}
		c.Next()
	}
} 