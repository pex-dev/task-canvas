package rest

import (
	"net/http"
	"task-canvas/config"
	db_driver "task-canvas/driver/generated"
	"task-canvas/gateway"
	"task-canvas/logger"
	"task-canvas/useCase"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type Todo struct {
	Id        string `json:"id"`
	Content   string `json:"content"`
	Completed bool   `json:"completed"`
}

type GetTodosResponse struct {
	Todos []Todo `json:"todos"`
}

type PostTodosRequest struct {
	Content       string `json:"content"`
	ScheduledDate int    `json:"scheduled_date"`
}

func GetTodos(c echo.Context) error {
	todoDriver := db_driver.New(config.PgPool)
	todoGateway := gateway.NewTodoGateway(todoDriver)
	todoUseCase := useCase.NewGetTodoUseCase(todoGateway)

	todos, err := todoUseCase.Get(c.Request().Context())
	if err != nil {
		logger.Logger.Error("Failed to bind release: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	restods := make([]Todo, 0, len(todos))
	for _, todo := range todos {
		restods = append(restods, Todo{
			Id:        uuid.UUID(todo.ID).String(),
			Content:   todo.Content,
			Completed: todo.Completed,
		})
	}

	res := GetTodosResponse{
		Todos: restods,
	}

	return c.JSON(http.StatusOK, res)
}

func PostTodos(c echo.Context) error {
	req := c.Request()
	return c.Stream(http.StatusOK, req.Header.Get(echo.HeaderContentType), req.Body)
}
