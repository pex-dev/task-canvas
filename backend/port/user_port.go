package port

import (
	"context"
	"task-canvas/domain"
)

type UserPort interface {
	Store(ctx context.Context, user *domain.User) error
}
