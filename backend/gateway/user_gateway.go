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

func (g *UserGateway) FindById(ctx context.Context, userId *domain.UserId) (*domain.User, error) {
	dbUser, err := g.db_driver.FindUserById(ctx, uuid.UUID(*userId))
	if err != nil {
		return nil, err
	}

	user := domain.User{
		Id:           domain.UserId(dbUser.ID),
		Email:        domain.Email(dbUser.Email),
		PasswordHash: domain.PasswordHash(dbUser.PasswordHash),
	}

	return &user, nil
}

func (g *UserGateway) FindByEmailAndPasswordHash(ctx context.Context, email domain.Email, passwordHash domain.PasswordHash) (*domain.User, error) {
	return nil, nil
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

func (g *UserGateway) FindByEmail(ctx context.Context, email domain.Email) (*domain.User, error) {
	dbUser, err := g.db_driver.FindUserByEmail(ctx, string(email))
	if err != nil {
		return nil, domain.ErrPasswordIncorrect
	}

	user := domain.User{
		Id:           domain.UserId(dbUser.ID),
		Email:        domain.Email(dbUser.Email),
		PasswordHash: domain.PasswordHash(dbUser.PasswordHash),
	}

	return &user, nil
}
