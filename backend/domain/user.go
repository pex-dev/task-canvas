package domain

import (
	"errors"

	"github.com/google/uuid"
)

type UserId uuid.UUID

type Email string

var ErrUserNotFound = errors.New("user not found")

type User struct {
	Id           UserId
	Email        Email
	PasswordHash PasswordHash
}

func NewUserId() UserId {
	return UserId(uuid.New())
}
