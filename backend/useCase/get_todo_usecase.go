package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type GetTodoUseCase struct {
	todoPort port.TodoPort
}

func NewGetTodoUseCase(todoPort port.TodoPort) *GetTodoUseCase {
	return &GetTodoUseCase{
		todoPort: todoPort,
	}
}

func (u *GetTodoUseCase) Get(ctx context.Context) ([]domain.Todo, error) {
	todos, err := u.todoPort.Get(ctx)
	if err != nil {
		return nil, err
	}

	return todos, nil
}
