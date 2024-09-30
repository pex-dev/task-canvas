package middleware

import (
	"net/http"
	"strings"
	"task-canvas/config"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/gateway"
	"task-canvas/useCase"

	"github.com/labstack/echo/v4"
)

func ValidateJWT(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")

		if authHeader == "" {
			return echo.NewHTTPError(http.StatusUnauthorized, "Authorization header is required")
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}

		dbDriver := db_driver.NewQuerier(config.PgPool)
		userGateway := gateway.NewUserGateway(dbDriver)
		authJwtUseCase := useCase.NewAuthJWTUseCase(userGateway)

		userId, err := authJwtUseCase.Exec(c.Request().Context(), (*domain.UserJwtToken)(&tokenString))
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}

		c.Set("userId", userId)

		return next(c)
	}
}
