package port

import (
	"context"
	"task-canvas/domain"
)

type UserPort interface {
	FindById(ctx context.Context, userId *domain.UserId) (*domain.User, error)
	Store(ctx context.Context, user *domain.User) error
}
