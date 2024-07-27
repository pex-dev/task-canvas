package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type CreateTodoUseCase struct {
	todoPort port.TodoPort
}

func NewCreateTodoUseCase(todoPort port.TodoPort) *CreateTodoUseCase {
	return &CreateTodoUseCase{
		todoPort: todoPort,
	}
}

func (u *CreateTodoUseCase) create(ctx context.Context, todo domain.Todo) (string, error) {
	panic("")
}
