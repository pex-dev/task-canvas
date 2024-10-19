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

func (u *DeleteTodoUseCase) Delete(ctx context.Context, todoId domain.TodoId, userId domain.UserId) error {
	err := u.todoPort.Delete(ctx, todoId, userId)
	if err != nil {
		return err
	}

	return nil
}
