package gateway

import (
	"context"
	"task-canvas/domain"
	db_driver "task-canvas/driver/generated"
	"task-canvas/port"

	"github.com/google/uuid"
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
			Content:   domain.TodoContent(todo.Content),
			Completed: domain.TodoCompleted(todo.Completed),
		})
	}

	return res, nil
}

func (g *TodoGateway) Store(ctx context.Context, todo domain.Todo) error {
	err := g.db_driver.InsertTodo(ctx, db_driver.InsertTodoParams{
		ID:        uuid.UUID(todo.ID),
		Content:   string(todo.Content),
		Completed: bool(todo.Completed),
	})

	if err != nil {
		return err
	}

	return nil
}

func (g *TodoGateway) Update(ctx context.Context, todo domain.Todo) error {
	err := g.db_driver.UpdateTodo(ctx, db_driver.UpdateTodoParams{
		ID:        uuid.UUID(todo.ID),
		Content:   string(todo.Content),
		Completed: bool(todo.Completed),
	})

	if err != nil {
		return err
	}

	return nil
}
