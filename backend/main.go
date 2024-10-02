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
	}))

	middleware.Initlogging(e, logger.Logger)

	e.GET("/v1/systems/ping", rest.Ping)
	e.POST("/v1/signUp", rest.PostSignUpUsers)
	e.POST("/v1/signIn", rest.PostSignIn)

	apiGroup := e.Group("/v1")
	apiGroup.Use(middleware.ValidateJWT)
	apiGroup.GET("/todos", rest.GetTodos)
	apiGroup.POST("/todos", rest.PostTodos)
	apiGroup.PUT("/todos/:id", rest.PutTodo)
	apiGroup.DELETE("/todos/:id", rest.DeleteTodo)

	e.Logger.Fatal(e.Start(defaultPort))
}
