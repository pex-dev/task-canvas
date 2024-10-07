// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db_driver

import (
	"context"

	uuid "github.com/google/uuid"
)

type Querier interface {
	DeleteTodo(ctx context.Context, id uuid.UUID) error
	FindTodo(ctx context.Context, userID uuid.UUID) ([]FindTodoRow, error)
	FindUserByEmail(ctx context.Context, email string) (TaskCanvasUser, error)
	FindUserById(ctx context.Context, id uuid.UUID) (TaskCanvasUser, error)
	InsertTodo(ctx context.Context, arg InsertTodoParams) error
	InsertUser(ctx context.Context, arg InsertUserParams) error
	InsertUserTodo(ctx context.Context, arg InsertUserTodoParams) error
	UpdateTodo(ctx context.Context, arg UpdateTodoParams) error
}

var _ Querier = (*Queries)(nil)
