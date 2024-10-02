package port

import (
	"context"
	"task-canvas/domain"
)

type UserPort interface {
	FindById(ctx context.Context, userId *domain.UserId) (*domain.User, error)
	FindByEmail(ctx context.Context, email domain.Email) (*domain.User, error)
	Store(ctx context.Context, user *domain.User) error
}
