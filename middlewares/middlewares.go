package middlewares

import (
	"cacaodelight/models"
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func extractToken(authHeader string) string {
	if authHeader == "" {
		return ""
	}
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		fmt.Println("Invalid auth header format")
		return ""
	}
	return parts[1]
}

func validateToken(tokenString string) bool {
	if tokenString == "" {
		fmt.Println("Token is empty")
		return false
	}

	token, err := jwt.ParseWithClaims(tokenString, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("pabloFarlopa"), nil
	})
	if err != nil {
		fmt.Println("Error parsing token:", err)
		return false
	}
	if !token.Valid {
		fmt.Println("Token is not valid")
		return false
	}

	fmt.Println("Token is valid")
	return true
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		token := extractToken(authHeader)
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No token found"})
			c.Abort()
			return
		}
		if !validateToken(token) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}
