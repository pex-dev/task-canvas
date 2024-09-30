package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type AuthJWTUseCase struct {
	userPort port.UserPort
}

func NewAuthJWTUseCase(userPort port.UserPort) *AuthJWTUseCase {
	return &AuthJWTUseCase{
		userPort: userPort,
	}
}

func (u *AuthJWTUseCase) Exec(ctx context.Context, userJWTToken *domain.UserJwtToken) (domain.UserId, error) {
	userId, err := userJWTToken.ValidateJWT()
	if err != nil {
		return domain.UserId{}, err
	}

	_, err = u.userPort.FindById(ctx, userId)
	if err != nil {
		return domain.UserId{}, err
	}

	return *userId, nil
}
