package domain

import "github.com/google/uuid"

type TodoId uuid.UUID

type Todo struct {
	ID        TodoId
	Content   string
	Completed bool
}
