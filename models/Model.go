package models

type Pale struct {
	ID           uint `gorm:"primaryKey"`
	NumeroDePale int
	Kg           float64 `gorm:"type:decimal(10,2)"`
	Lote         string  `gorm:"size:50"`
	Ubicacion    string  `gorm:"size:50"`
	Estado       string  `gorm:"size:50"`
	Expedido     bool
	Producto     string `gorm:"size:50"`
}

func (Pale) TableName() string { return "pales" }

type User struct {
	ID         uint `gorm:"primaryKey"`
	Nombre     string
	Contraseña string
	Foto       []byte `gorm:"type:longblob"`
}


func (User) TableName() string { return "usuarios" }
