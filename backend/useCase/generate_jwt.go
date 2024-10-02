package useCase

import "task-canvas/domain"

type GenerateJwtUseCase struct{}

func NewGenerateJwtUseCase() *GenerateJwtUseCase {
	return &GenerateJwtUseCase{}
}

func (u *GenerateJwtUseCase) Exec(userId domain.UserId) (domain.UserJwtToken, error) {
	jwtToken, err := domain.NewUserJwtToken(&userId)

	if err != nil {
		return domain.UserJwtToken(""), err
	}

	return jwtToken, nil
}
