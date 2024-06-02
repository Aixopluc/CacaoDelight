package main

import (
	"cacaodelight/controllers"
	"cacaodelight/initializers"
	"cacaodelight/middlewares"

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

	// Rutas sin auth
	r.POST("/users/create", controllers.CreateUser)
	r.POST("/users/login", controllers.Login)

	// A partir de aquí deberían estar protejidas con el token!
	protected := r.Group("/")
	protected.Use(middlewares.AuthMiddleware())
	{
		protected.POST("/pale/create", controllers.PaleCreate)
		protected.GET("/pales/getAll", controllers.GetAllPales)
		protected.GET("/pale/getOneId/:ID", controllers.GetPaleById)
		protected.GET("/pale/getOneEti/:ETI", controllers.GetPaleByEti)
		protected.POST("/pale/upd/:ID", controllers.PaleUpdate)
		protected.POST("/pales/exp", controllers.PaleToExp)
		protected.GET("/palesexp", controllers.GetAllPalesExp)
		protected.POST("/paleexp/:numPale", controllers.ExpPale)
		protected.DELETE("/delete/:ID", controllers.DeletePaleById)
		protected.POST("/pale/move", controllers.MovePale)
		protected.POST("/pales/upload", controllers.UploadPales)
	}

	r.Run(":8080") // listen and serve on 0.0.0.0:8080
}
