package rest

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Todo struct {
	Id            int
	Content       string
	ScheduledDate int
	Completed     bool
}

type GetTodosResponse []struct {
	Id            int    `json:"id"`
	Content       string `json:"content"`
	Completed     bool   `json:"completed"`
	ScheduledDate int    `json:"scheduled_date"`
}

type PostTodosRequest struct {
	Content       string `json:"content"`
	ScheduledDate int    `json:"scheduled_date"`
}

func GetTodos(c echo.Context) error {
	response := GetTodosResponse{
		{Id: 1, Content: "TODOアイテムの一つ目", Completed: false, ScheduledDate: 0},
		{Id: 2, Content: "TODOアイテムの二つ目", Completed: true, ScheduledDate: 0},
		{Id: 3, Content: "TODOアイテムの三つ目", Completed: false, ScheduledDate: 0},
	}
	return c.JSON(http.StatusOK, response)
}

func PostTodos(c echo.Context) error {
	req := c.Request()
	return c.Stream(http.StatusOK, req.Header.Get(echo.HeaderContentType), req.Body)
}
