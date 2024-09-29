package domain

import (
	"errors"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type UserJwtToken string

func NewUserJwtToken(userId *UserId) (UserJwtToken, error) {
	exp := 72

	claims := jwt.MapClaims{
		"user_id": uuid.UUID(*userId),
		"exp":     exp,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return "", errors.New("JWT_SECRET is not set")
	}

	signedToken, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return UserJwtToken(signedToken), nil
}
