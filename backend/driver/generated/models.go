// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package db_driver

import (
	uuid "github.com/google/uuid"
)

type TaskCanvasTodo struct {
	ID        uuid.UUID `json:"id"`
	Content   string    `json:"content"`
	Completed bool      `json:"completed"`
}
