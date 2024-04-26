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
	initializers.DB.Find(&pales, "expedido = false")

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
	id := c.Param("ID")

	var paleUpdateData models.Pale
	if err := c.BindJSON(&paleUpdateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var pale models.Pale
	if err := initializers.DB.First(&pale, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Registro no encontrado"})
		return
	}

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

func PaleToExp(c *gin.Context) {
	var numsPales []int
	var pales []models.Pale

	if err := c.BindJSON(&numsPales); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, numPale := range numsPales {
		var pale models.Pale
		if err := initializers.DB.Find(&pale, "numero_de_pale = ?", numPale).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No se encontró un pale con el número " + string(numPale)})
			return
		}
		pale.Estado = "Expedir"
		pales = append(pales, pale)
		if err := initializers.DB.Save(&pale).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo guardar el pale modificado en la base de datos"})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"pale": pales})
}

func GetAllPalesExp(c *gin.Context) {
	var pales []models.Pale
	initializers.DB.Find(&pales, "expedido = true")

	c.JSON(200, gin.H{
		"pales": pales,
	})
}
