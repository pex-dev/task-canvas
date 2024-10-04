package rest

import "github.com/labstack/echo/v4"

func VerifyToken(c echo.Context) error {
	return c.String(200, "Token is valid")
}
