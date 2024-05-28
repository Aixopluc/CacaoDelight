package models

import "github.com/dgrijalva/jwt-go"

type Pale struct {
	ID           uint `gorm:"primaryKey"`
	NumeroDePale int
	Kg           float64 `gorm:"type:decimal(10,2)"`
	Lote         string  `gorm:"size:50"`
	Ubicacion    string  `gorm:"size:50"`
	Estado       string  `gorm:"size:50"`
	Expedido     bool
	Producto     string `gorm:"size:50"`
	Cantidad     int
}

func (Pale) TableName() string { return "pales" }

type User struct {
	ID         uint `gorm:"primaryKey"`
	Nombre     string
	Contraseña string
	Rol        int
}

func (User) TableName() string { return "usuarios" }

type RegisterInput struct {
	Nombre     string `json:"nombre" binding:"required"`
	Contraseña string `json:"contraseña" binding:"required"`
	Rol        int    `json:"rol"`
}

type LoginInput struct {
	Nombre     string `json:"nombre" binding:"required"`
	Contraseña string `json:"contraseña" binding:"required"`
}

type Claims struct {
	UsuarioID uint `json:"usuario_id"`
	Rol       int  `json:"rol"`
	jwt.StandardClaims
}
