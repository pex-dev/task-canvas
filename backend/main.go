package main

import (
	"net/http"

	"task-canvas/logger"
	"task-canvas/middleware"
	"task-canvas/rest"

	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
)

const defaultPort = ":8080"

func main() {
	e := echo.New()
	e.Use(echoMiddleware.CORSWithConfig(echoMiddleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	middleware.Initlogging(e, logger.Logger)

	e.GET("/v1/systems/ping", rest.Ping)
	e.POST("/v1/signUp", rest.PostSignUpUsers)
	e.POST("/v1/signIn", rest.PostSignIn)

	apiGroup := e.Group("/v1")
	apiGroup.Use(middleware.ValidateJWT)
	apiGroup.POST("/verifyToken", rest.VerifyToken, middleware.GenerateJwt)
	apiGroup.GET("/todos", rest.GetTodos, middleware.GenerateJwt)
	apiGroup.POST("/todos", rest.PostTodos, middleware.GenerateJwt)
	apiGroup.PUT("/todos/:id", rest.PutTodo, middleware.GenerateJwt)
	apiGroup.DELETE("/todos/:id", rest.DeleteTodo, middleware.GenerateJwt)

	e.Logger.Fatal(e.Start(defaultPort))
}
