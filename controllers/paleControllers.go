package controllers

import (
	"cacaodelight/initializers"
	"cacaodelight/models"
	"encoding/csv"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func PaleCreate(c *gin.Context) {

	var paleData models.Pale
	if err := c.BindJSON(&paleData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existingPale models.Pale
	if err := initializers.DB.Where("numero_de_pale = ?", paleData.NumeroDePale).First(&existingPale).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "El Pale ya existe"})
		return
	}

	result := initializers.DB.Create(&paleData)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el registro Pale"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"pale": paleData})
}

func UploadPales(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al obtener el archivo"})
		return
	}

	// Abrir el archivo CSV
	csvFile, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al abrir el archivo"})
		return
	}
	defer csvFile.Close()

	// Leer el archivo CSV
	reader := csv.NewReader(csvFile)
	reader.Comma = ',' // Por defecto es la coma
	records, err := reader.ReadAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al leer el archivo CSV"})
		return
	}

	// Procesar las filas del CSV
	var pales []models.Pale
	for _, record := range records {
		numeroDePale, _ := strconv.Atoi(record[1])
		kg, _ := strconv.ParseFloat(record[2], 64)
		cantidad, _ := strconv.Atoi(record[8])

		pale := models.Pale{
			NumeroDePale: numeroDePale,
			Kg:           kg,
			Lote:         record[3],
			Ubicacion:    record[4],
			Estado:       record[5],
			Expedido:     strings.ToLower(record[6]) == "false",
			Producto:     record[7],
			Cantidad:     cantidad,
		}
		pales = append(pales, pale)
	}

	// Insertar los registros en la base de datos
	if err := initializers.DB.Create(&pales).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al insertar los registros"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Pales insertados correctamente"})
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

	if paleUpdateData.Cantidad != 0 {
		pale.Cantidad = paleUpdateData.Cantidad
	}

	if err := initializers.DB.Save(&pale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

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
	initializers.DB.Order("ubicacion ASC").Find(&pales, "estado = ? AND expedido = ?", "Expedir", false)

	c.JSON(200, gin.H{
		"pales": pales,
	})
}

func ExpPale(c *gin.Context) {

	numPale := c.Param("numPale")
	var pale models.Pale
	initializers.DB.Find(&pale, "numero_de_pale = ?", numPale)
	pale.Expedido = true
	if err := initializers.DB.Save(&pale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

	c.JSON(200, gin.H{
		"pales": pale,
	})
}

func DeletePaleById(c *gin.Context) {

	id := c.Param("ID")
	var pales models.Pale
	initializers.DB.Where("id = ?", id).First(&pales).Delete(&pales)

	c.JSON(200, gin.H{
		"palesdelete": pales,
	})
}

func MovePale(c *gin.Context) {

	var requestBody struct {
		ETI int    `json:"eti"`
		UBI string `json:"ubi"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido"})
		return
	}

	eti := requestBody.ETI
	ubi := requestBody.UBI

	var pale models.Pale
	if err := initializers.DB.Where("numero_de_pale = ?", eti).First(&pale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar el pale en la base de datos"})
		return
	}

	if ubi == "Antecamara" {
		if pale.Estado == "Bloqueado" || pale.Estado == "Expedir" {
			pale.Ubicacion = ubi
		} else {
			pale.Estado = "Por ubicar"
			pale.Ubicacion = ubi
		}
	} else if strings.HasPrefix(ubi, "01") {
		if pale.Estado == "Bloqueado" || pale.Estado == "Expedir" {
			pale.Ubicacion = ubi
		} else {
			pale.Estado = "Ubicado"
			pale.Ubicacion = ubi
		}
	} else if strings.HasPrefix(ubi, "02") {
		if pale.Estado == "Bloqueado" || pale.Estado == "Expedir" {
			pale.Ubicacion = ubi
		} else {
			pale.Estado = "Producción"
			pale.Ubicacion = ubi
		}
	}

	if err := initializers.DB.Save(&pale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pale movido correctamente"})
}
