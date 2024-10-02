package rest

import (
	"net/http"
	"task-canvas/config"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/gateway"
	"task-canvas/useCase"

	"github.com/labstack/echo/v4"
)

type PostSignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func PostSignIn(ctx echo.Context) error {
	req := new(PostSignInRequest)
	if err := ctx.Bind(req); err != nil {
		return err
	}

	dbDriver := db_driver.NewQuerier(config.PgPool)
	userGateway := gateway.NewUserGateway(dbDriver)
	signInUseCase := useCase.NewSignInUseCase(userGateway)
	generateJwtUseCase := useCase.NewGenerateJwtUseCase()

	echoCtx := ctx.Request().Context()

	userId, err := signInUseCase.Exec(echoCtx, domain.Email(req.Email), domain.Password(req.Password))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	jwtToken, err := generateJwtUseCase.Exec(*userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	ctx.Response().Header().Set("Authorization", "Bearer "+string(jwtToken))

	return ctx.NoContent(http.StatusOK)
}
