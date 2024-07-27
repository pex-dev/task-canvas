package domain

import "github.com/google/uuid"

type Todo struct {
	ID        uuid.UUID
	Content   string
	Completed bool
}
