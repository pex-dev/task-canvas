package gateway

import (
	"context"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/port"

	sqlc "task-canvas/driver/generated"

	"github.com/google/uuid"
)

type UserGateway struct {
	db_driver db_driver.Querier
}

func NewUserGateway(db_driver db_driver.Querier) port.UserPort {
	return &UserGateway{
		db_driver: db_driver,
	}
}

func (g *UserGateway) Store(ctx context.Context, user *domain.User) error {
	insertUserParams := sqlc.InsertUserParams{
		ID:           uuid.UUID(user.Id),
		Email:        string(user.Email),
		PasswordHash: string(user.PasswordHash),
	}

	err := g.db_driver.InsertUser(ctx, insertUserParams)
	if err != nil {
		return err
	}

	return nil
}
