package main

import (
	"cacaodelight/initializers"
)

func init() {
	initializers.LoadEnvvariables()
	initializers.ConnectToDB()
}

// func main() {
// 	initializers.DB.AutoMigrate(&models.Post{})
// }
