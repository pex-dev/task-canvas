package domain

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Password string

type PasswordHash string

func (p *Password) Empty() bool {
	return *p == ""
}

func HashPassword(password Password) (PasswordHash, error) {
	if password.Empty() {
		return "", errors.New("password is empty")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return PasswordHash(hashedPassword), nil
}
