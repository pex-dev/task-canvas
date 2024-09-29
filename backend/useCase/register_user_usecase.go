package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type RegisterUserCase struct {
	userPort port.UserPort
}

func NewRegisterUserCase(userPort port.UserPort) *RegisterUserCase {
	return &RegisterUserCase{
		userPort: userPort,
	}
}

func (u *RegisterUserCase) Exec(ctx context.Context, email domain.Email, password domain.Password) (domain.UserJwtToken, error) {
	passwordHash, err := domain.HashPassword(password)
	if err != nil {
		return "", err
	}

	userId := domain.NewUserId()
	user := domain.User{
		Id:           userId,
		Email:        email,
		PasswordHash: passwordHash,
	}

	err = u.userPort.Store(&user)
	if err != nil {
		return "", err
	}

	userJwtToken, err := domain.NewUserJwtToken(&userId)
	if err != nil {
		return "", err
	}

	return userJwtToken, nil
}
