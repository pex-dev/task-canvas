package port

import (
	"context"
	"task-canvas/domain"
)

type TodoPort interface {
	Get(ctx context.Context) ([]domain.Todo, error)
	Store(ctx context.Context, todo domain.Todo) error
}
