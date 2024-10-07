package port

import (
	"context"
	"task-canvas/domain"
)

type TodoPort interface {
	Get(ctx context.Context, userId domain.UserId) ([]domain.Todo, error)
	Store(ctx context.Context, todo domain.Todo) error
	Update(ctx context.Context, todo domain.Todo) error
	Delete(ctx context.Context, id domain.TodoId) error
}
