package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"ASE/BACK-END/controllers"
	"ASE/BACK-END/middlewares"

	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// set db to gin context
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	r.Use(middlewares.CorsMiddleware())

	// Handle preflight OPTIONS request globally
	r.OPTIONS("/*path", func(c *gin.Context) {
		c.JSON(200, "OK")
	})
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.GET("/listUser", controllers.GetAllUser)
	r.GET("/listUser/id/:id", controllers.GetUserById)
	r.GET("/listUser/username/:username", controllers.GetUserByUsername)

	r.GET("/order", controllers.GetAllOrder)

	orderMiddlewareRoute := r.Group("/order")
	orderMiddlewareRoute.Use(middlewares.KasirCheckMinddleware())
	orderMiddlewareRoute.POST("/", controllers.CreateOrder)
	orderMiddlewareRoute.PATCH("/:id", controllers.UpdateOrder)
	orderMiddlewareRoute.PATCH("/id/:id", controllers.UpdateOrderbyId)
	orderMiddlewareRoute.DELETE("/:id", controllers.DeleteOrder)

	r.GET("/menus", controllers.GetAllMenu)
	r.GET("/menus/name/:name", controllers.GetIdByMenu)
	r.GET("/menus/id/:id", controllers.GetMenuById)

	menuMiddlewareRoute := r.Group("/menus")
	menuMiddlewareRoute.Use(middlewares.TenantCheckMinddleware())
	menuMiddlewareRoute.POST("/", controllers.CreateMenu)
	menuMiddlewareRoute.PATCH("/:id", controllers.UpdateMenu)
	menuMiddlewareRoute.DELETE("/:id", controllers.DeleteMenu)

	r.GET("/laporan", controllers.GetAllLaporan)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Static("/Storage_Photo", "./Storage_Photo")
	r.Static("/Default_Photo", "./Default_Photo")
	return r
}
