package gateway

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"

	"github.com/google/uuid"
)

type TodoIdGateway struct {
	todoIdPort port.TodoIdPort
}

func NewTodoIdGateway() port.TodoIdPort {
	return &TodoIdGateway{}
}

func (g *TodoIdGateway) Generate(ctx context.Context) (domain.TodoId, error) {
	uuid, err := uuid.NewV6()

	if err != nil {
		return domain.TodoId{}, err
	}

	return domain.TodoId(uuid), nil
}
