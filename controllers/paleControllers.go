package controllers

import (
	"cacaodelight/initializers"
	"cacaodelight/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PaleCreate(c *gin.Context) {
	// Analizar el JSON de la solicitud en una estructura Pale
	var paleData models.Pale
	if err := c.BindJSON(&paleData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Crear un nuevo registro Pale con los datos proporcionados
	result := initializers.DB.Create(&paleData)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el registro Pale"})
		return
	}

	// Respuesta exitosa con el registro creado
	c.JSON(http.StatusCreated, gin.H{"pale": paleData})
}

func GetPaleByEti(c *gin.Context) {
	NumeroDePale := c.Param("ETI")
	var pales models.Pale
	if err := initializers.DB.Where("numero_de_pale = ?", NumeroDePale).First(&pales).Error; err != nil {
		log.Println("Error fetching pale:", err)
	}

	c.JSON(200, gin.H{
		"pales": pales,
	})
}

func GetAllPales(c *gin.Context) {
	var pales []models.Pale
	initializers.DB.Find(&pales)

	c.JSON(200, gin.H{
		"pales": pales,
	})

}

func GetPaleById(c *gin.Context) {

	id := c.Param("ID")
	var pales models.Pale
	initializers.DB.First(&pales, id)

	c.JSON(200, gin.H{
		"pales": pales,
	})

}

func PaleUpdate(c *gin.Context) {
	// Paso 1: Parsear el ID del parámetro de la URL
	id := c.Param("ID")

	// Paso 2: Vincular los datos del JSON de la solicitud a una estructura en Go
	var paleUpdateData models.Pale
	if err := c.BindJSON(&paleUpdateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Paso 3: Recuperar el registro de la base de datos que deseas actualizar utilizando GORM
	var pale models.Pale
	if err := initializers.DB.First(&pale, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Registro no encontrado"})
		return
	}

	// Paso 4: Actualizar los campos del registro con los datos proporcionados en la solicitud
	// Actualiza solo los campos que están presentes en la solicitud
	if paleUpdateData.NumeroDePale != 0 {
		pale.NumeroDePale = paleUpdateData.NumeroDePale
	}
	if paleUpdateData.Kg != 0 {
		pale.Kg = paleUpdateData.Kg
	}
	if paleUpdateData.Lote != "" {
		pale.Lote = paleUpdateData.Lote
	}
	if paleUpdateData.Ubicacion != "" {
		pale.Ubicacion = paleUpdateData.Ubicacion
	}
	if paleUpdateData.Estado != "" {
		pale.Estado = paleUpdateData.Estado
	}
	if paleUpdateData.Expedido {
		pale.Expedido = paleUpdateData.Expedido
	}
	if paleUpdateData.Producto != "" {
		pale.Producto = paleUpdateData.Producto
	}
	// Paso 5: Guardar los cambios en la base de datos
	if err := initializers.DB.Save(&pale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

	// Respuesta exitosa
	c.JSON(http.StatusOK, pale)
}
