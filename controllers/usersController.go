package controllers

import (
	"cacaodelight/initializers"
	"cacaodelight/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserCreate(c *gin.Context) {
	// Analizar el JSON de la solicitud en una estructura Pale
	var userData models.User
	if err := c.BindJSON(&userData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Crear un nuevo registro Pale con los datos proporcionados
	result := initializers.DB.Create(&userData)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el registro usuario"})
		return
	}

	// Respuesta exitosa con el registro creado
	c.JSON(http.StatusCreated, gin.H{"user": userData})
}

func UsersUpdate(c *gin.Context) {
	id := c.Param("ID")

	var userUpdateData models.User
	if err := c.BindJSON(&userUpdateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := initializers.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Registro no encontrado"})
		return
	}

	// Actualizar el nombre si se proporciona en la solicitud
	if userUpdateData.Nombre != "" {
		user.Nombre = userUpdateData.Nombre
	}

	// Actualizar la contraseña si se proporciona en la solicitud
	if userUpdateData.Contraseña != "" {
		user.Contraseña = userUpdateData.Contraseña
	}

	// Guardar los cambios en la base de datos
	if err := initializers.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

	// Respuesta exitosa
	c.JSON(http.StatusOK, user)
}
