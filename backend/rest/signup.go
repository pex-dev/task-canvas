package rest

import (
	"net/http"
	"task-canvas/logger"

	"github.com/labstack/echo/v4"
)

type PostSignUpUsersRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func PostSignUpUsers(c echo.Context) error {
	req := new(PostSignUpUsersRequest)

	if err := c.Bind(req); err != nil {
		logger.Logger.Error("Failed to bind release: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return nil
}
