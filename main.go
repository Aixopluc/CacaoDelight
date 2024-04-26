package main

import (
	"cacaodelight/controllers"
	"cacaodelight/initializers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvvariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"},
	}))
	r.POST("/pales", controllers.PaleCreate)
	r.GET("/pales", controllers.GetAllPales)
	r.GET("/pales/:ID", controllers.GetPaleById)
	r.GET("/pale/:ETI", controllers.GetPaleByEti)
	r.POST("/pales/:ID", controllers.PaleUpdate)
	r.POST("/pales/exp", controllers.PaleToExp)
	r.GET("/palesexp", controllers.GetAllPalesExp)
	r.Run(":8080") // listen and serve on 0.0.0.0:8080
}
