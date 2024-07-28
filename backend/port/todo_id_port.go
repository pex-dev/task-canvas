package port

import (
	"context"
	"task-canvas/domain"
)

type TodoIdPort interface {
	Generate(ctx context.Context) (domain.TodoId, error)
}
