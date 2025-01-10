package gateway

import (
	"context"
	"sort"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	sqlc "task-canvas/driver/generated"
	"task-canvas/port"

	"github.com/google/uuid"
)

type TodoGateway struct {
	db_driver db_driver.Querier
}

func NewTodoGateway(db_driver db_driver.Querier) port.TodoPort {
	return &TodoGateway{
		db_driver: db_driver,
	}
}

func (g *TodoGateway) Get(ctx context.Context, userId domain.UserId) ([]domain.Todo, error) {
	todos, err := g.db_driver.FindTodo(ctx, uuid.UUID(userId))
	if err != nil {
		return nil, err
	}

	sort.Slice(todos, func(i, j int) bool {
		return todos[i].CreatedAt.Time.After(todos[j].CreatedAt.Time)
	})

	res := make([]domain.Todo, 0, len(todos))

	for _, todo := range todos {
		res = append(res, domain.Todo{
			ID:        domain.TodoId(todo.TodoID),
			Content:   domain.TodoContent(todo.Content),
			Completed: domain.TodoCompleted(todo.Completed),
			UserId:    domain.UserId(todo.UserID),
		})
	}

	return res, nil
}

func (g *TodoGateway) Store(ctx context.Context, todo domain.Todo) error {
	tx, err := g.db_driver.Begin(ctx)
	if err != nil {
		return err
	}

	defer func() {
		if p := recover(); p != nil {
			if rerr := tx.Rollback(ctx); rerr != nil {
				panic(rerr)
			}
			panic(p)
		} else if err != nil {
			if rerr := tx.Rollback(ctx); rerr != nil {
				panic(rerr)
			}
		} else {
			err = tx.Commit(ctx)
		}
	}()

	querier := g.db_driver.WithTx(tx)

	err = querier.InsertTodo(ctx, sqlc.InsertTodoParams{
		ID:        uuid.UUID(todo.ID),
		Content:   string(todo.Content),
		Completed: bool(todo.Completed),
	})

	if err != nil {
		return err
	}

	err = querier.InsertUserTodo(ctx, sqlc.InsertUserTodoParams{
		UserID: uuid.UUID(todo.UserId),
		TodoID: uuid.UUID(todo.ID),
	})
	if err != nil {
		return err
	}

	return nil
}

func (g *TodoGateway) Update(ctx context.Context, todo domain.Todo) error {
	err := g.db_driver.UpdateTodo(ctx, sqlc.UpdateTodoParams{
		TodoID:    uuid.UUID(todo.ID),
		Content:   string(todo.Content),
		Completed: bool(todo.Completed),
		UserID:    uuid.UUID(todo.UserId),
	})

	if err != nil {
		return err
	}

	return nil
}

func (g *TodoGateway) Delete(ctx context.Context, id domain.TodoId, userId domain.UserId) error {
	tx, err := g.db_driver.Begin(ctx)
	if err != nil {
		return err
	}

	defer func() {
		if p := recover(); p != nil {
			if rerr := tx.Rollback(ctx); rerr != nil {
				panic(rerr)
			}
			panic(p)
		} else if err != nil {
			if rerr := tx.Rollback(ctx); rerr != nil {
				panic(rerr)
			}
		} else {
			err = tx.Commit(ctx)
		}
	}()

	querier := g.db_driver.WithTx(tx)
	err = querier.DeleteTodo(ctx, sqlc.DeleteTodoParams{
		TodoID: uuid.UUID(id),
		UserID: uuid.UUID(userId),
	})
	if err != nil {
		return err
	}

	return nil
}
