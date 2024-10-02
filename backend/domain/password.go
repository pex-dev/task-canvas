package domain

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Password string

type PasswordHash string

var ErrPasswordIncorrect = errors.New("password is incorrect")

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

func (ph *PasswordHash) ComparePasswordHash(targetPassword Password) bool {
	return bcrypt.CompareHashAndPassword([]byte(*ph), []byte(targetPassword)) == nil
}
