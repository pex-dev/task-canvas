package gateway

import (
	"context"
	"task-canvas/domain"
	db_driver "task-canvas/driver/generated"
	"task-canvas/port"
)

type TodoGateway struct {
	db_driver db_driver.Querier
}

func NewTodoGateway(db_driver db_driver.Querier) port.TodoPort {
	return &TodoGateway{
		db_driver: db_driver,
	}
}

func (g *TodoGateway) Get(ctx context.Context) ([]domain.Todo, error) {
	todos, err := g.db_driver.FindTodo(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]domain.Todo, 0, len(todos))

	for _, todo := range todos {
		res = append(res, domain.Todo{
			ID:        domain.TodoId(todo.ID),
			Content:   todo.Content,
			Completed: todo.Completed,
		})
	}

	return res, nil
}
