package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type StoreTodoUseCase struct {
	todoPort   port.TodoPort
	todoIdPort port.TodoIdPort
}

func NewStoreTodoUseCase(todoPort port.TodoPort, todoIdPort port.TodoIdPort) *StoreTodoUseCase {
	return &StoreTodoUseCase{
		todoPort:   todoPort,
		todoIdPort: todoIdPort,
	}
}

func (u *StoreTodoUseCase) Store(ctx context.Context, content domain.TodoContent, completed domain.TodoCompleted, userId domain.UserId) (domain.TodoId, error) {
	todoId, err := u.todoIdPort.Generate(ctx)
	if err != nil {
		return domain.TodoId{}, err
	}

	err = u.todoPort.Store(ctx, domain.Todo{
		ID:        todoId,
		Content:   content,
		Completed: completed,
		UserId:    userId,
	})

	if err != nil {
		return domain.TodoId{}, err
	}

	return todoId, nil
}
