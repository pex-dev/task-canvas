package main

import (
	"net/http"

	"task-canvas/rest"

	"github.com/labstack/echo/v4"
)

const defaultPort = ":8080"

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})
	e.GET("/todos", rest.GetTodos)
	e.POST("/todos", rest.PostTodos)

	e.Logger.Fatal(e.Start(defaultPort))
}
