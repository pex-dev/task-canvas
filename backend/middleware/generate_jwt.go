package middleware

import (
	"net/http"
	"task-canvas/domain"
	"task-canvas/logger"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func GenerateJwt(h echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		userIdStr := c.Get("userId").(string)
		userIdUuid, err := uuid.Parse(userIdStr)
		userId := domain.UserId(userIdUuid)

		if err != nil {
			logger.Logger.Error("Failed to parse userId: " + err.Error())
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to parse userId")
		}

		jwtToken, err := domain.NewUserJwtToken(&userId)
		if err != nil {
			logger.Logger.Error("Failed to generate jwt: " + err.Error())
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate jwt")
		}

		c.Response().Header().Set("Authorization", "Bearer "+string(jwtToken))

		return h(c)
	}
}
