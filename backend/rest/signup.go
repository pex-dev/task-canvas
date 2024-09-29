package rest

import (
	"net/http"
	"task-canvas/config"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/gateway"
	"task-canvas/logger"
	"task-canvas/useCase"

	"github.com/labstack/echo/v4"
)

type PostSignUpUsersRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func PostSignUpUsers(c echo.Context) error {
	req := new(PostSignUpUsersRequest)

	if err := c.Bind(req); err != nil {
		logger.Logger.Error("Failed to bind request: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request payload")
	}

	dbDriver := db_driver.NewQuerier(config.PgPool)
	userGateway := gateway.NewUserGateway(dbDriver)
	registerUserUseCase := useCase.NewRegisterUserCase(userGateway)

	password := domain.Password(req.Password)

	jwtToken, err := registerUserUseCase.Exec(c.Request().Context(), domain.Email(req.Email), password)
	if err != nil {
		logger.Logger.Error("registerUserUseCase failed: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to register user")
	}

	c.Response().Header().Set("Authorization", "Bearer "+string(jwtToken))

	return c.NoContent(http.StatusCreated)
}
