package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type DeleteTodoUseCase struct {
	todoPort port.TodoPort
}

func NewDeleteTodoUseCase(todoPort port.TodoPort) *DeleteTodoUseCase {
	return &DeleteTodoUseCase{
		todoPort: todoPort,
	}
}

func (u *DeleteTodoUseCase) Delete(ctx context.Context, id domain.TodoId) error {
	err := u.todoPort.Delete(ctx, id)
	if err != nil {
		return err
	}

	return nil
}
