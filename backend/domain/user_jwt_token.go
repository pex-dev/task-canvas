package domain

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type UserJwtToken string

func NewUserJwtToken(userId *UserId) (UserJwtToken, error) {
	exp := time.Now().Add(72 * time.Hour).Unix()

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

func (t UserJwtToken) ValidateJWT() (*UserId, error) {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return nil, errors.New("JWT_SECRET is not set")
	}

	token, err := jwt.Parse(string(t), func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}

		return []byte(jwtSecret), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userIdStr, ok := claims["user_id"].(string)
		if !ok {
			return nil, errors.New("user_id is not found")
		}

		userId, err := uuid.Parse(userIdStr)
		if err != nil {
			return nil, err
		}

		exp, ok := claims["exp"].(float64)
		if !ok {
			return nil, errors.New("exp is not found")
		}

		if time.Now().Unix() > int64(exp) {
			return nil, errors.New("token is expired")
		}

		return (*UserId)(&userId), nil
	}

	return nil, errors.New("token is invalid")
}
