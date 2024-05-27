package controllers

import (
	"cacaodelight/initializers"
	"cacaodelight/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var newUser models.RegisterInput
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Contraseña), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user := models.User{Nombre: newUser.Nombre, Contraseña: string(hashedPassword), Rol: newUser.Rol}

	if err := initializers.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Usuario creado correctamente"})
}

func Login(c *gin.Context) {
	var userLogin models.LoginInput
	if err := c.ShouldBindJSON(&userLogin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := initializers.DB.Where("nombre = ?", userLogin.Nombre).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Contraseña), []byte(userLogin.Contraseña)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)

	claims := models.Claims{
		UsuarioID: user.ID,
		Rol:       user.Rol,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			Issuer:    "cacaodelight",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("pabloFarlopa"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Incluye el prefijo "Bearer " en el token
	bearerToken := "Bearer " + tokenString

	c.JSON(http.StatusOK, gin.H{
		"token":  bearerToken,
		"nombre": user.Nombre,
		"rol":    user.Rol,
	})
}
