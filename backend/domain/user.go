package domain

import "github.com/google/uuid"

type UserId uuid.UUID

type Email string

type User struct {
	Id           UserId
	Email        Email
	PasswordHash PasswordHash
}

func NewUserId() UserId {
	return UserId(uuid.New())
}
