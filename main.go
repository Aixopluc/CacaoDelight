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
	r.POST("/pale/create", controllers.PaleCreate)
	r.GET("/pales/getAll", controllers.GetAllPales)
	r.GET("/pale/getOneId/:ID", controllers.GetPaleById)
	r.GET("/pale/getOneEti/:ETI", controllers.GetPaleByEti)
	r.POST("/pale/upd/:ID", controllers.PaleUpdate)
	r.POST("/pales/exp", controllers.PaleToExp)      //Pone el estado del pale a expedir
	r.GET("/palesexp", controllers.GetAllPalesExp)   //Devuelve todos los pales con estado expedir ordenado por ubicacion
	r.POST("/paleexp/:numPale", controllers.ExpPale) // Pone el booleano expedidp a true
	r.DELETE("/delete/:ID", controllers.DeletePaleById)
	r.POST("/pale/move", controllers.MovePale)
	r.Run(":8080") // listen and serve on 0.0.0.0:8080
}
