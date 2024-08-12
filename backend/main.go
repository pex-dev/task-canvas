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

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})
	e.GET("/v1/todos", rest.GetTodos)
	e.POST("/v1/todos", rest.PostTodos)
	e.PUT("/v1/todos/:id", rest.PutTodo)
	e.DELETE("/v1/todos/:id", rest.DeleteTodo)

	e.Logger.Fatal(e.Start(defaultPort))
}
