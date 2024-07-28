package gateway

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"

	"github.com/google/uuid"
)

type TodoIdGateway struct{}

func NewTodoIdGateway() port.TodoIdPort {
	return &TodoIdGateway{}
}

func (g *TodoIdGateway) Generate(ctx context.Context) (domain.TodoId, error) {
	uuid := uuid.New()

	return domain.TodoId(uuid), nil
}
