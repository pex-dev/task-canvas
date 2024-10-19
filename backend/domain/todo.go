package domain

import "github.com/google/uuid"

type TodoId uuid.UUID
type TodoContent string
type TodoCompleted bool

type Todo struct {
	ID        TodoId
	Content   TodoContent
	Completed TodoCompleted
	UserId    UserId
}
