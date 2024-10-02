package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type SignInUseCase struct {
	userPort port.UserPort
}

func NewSignInUseCase(userPort port.UserPort) *SignInUseCase {
	return &SignInUseCase{
		userPort: userPort,
	}
}

func (u *SignInUseCase) Exec(ctx context.Context, email domain.Email, password domain.Password) (*domain.UserId, error) {
	user, err := u.userPort.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	if !user.PasswordHash.ComparePasswordHash(password) {
		return nil, domain.ErrPasswordIncorrect
	}

	return &user.Id, nil
}
