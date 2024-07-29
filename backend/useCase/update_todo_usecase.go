package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type UpdateTodoUseCase struct {
	todoPort port.TodoPort
}

func NewUpdateTodoUseCase(todoPort port.TodoPort) *UpdateTodoUseCase {
	return &UpdateTodoUseCase{
		todoPort: todoPort,
	}
}

func (u *UpdateTodoUseCase) UpdateTodoUseCase(ctx context.Context, todo domain.Todo) error {
	err := u.todoPort.Update(ctx, todo)

	if err != nil {
		return err
	}

	return nil
}
