package driver

import (
	"context"
	db_driver "task-canvas/driver/generated"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Tx interface {
	pgx.Tx
}

type Querier interface {
	db_driver.Querier
	Begin(ctx context.Context) (pgx.Tx, error)
	WithTx(tx pgx.Tx) Querier
}

type QuerierImpl struct {
	pool *pgxpool.Pool
	*db_driver.Queries
}

func NewQuerier(pool *pgxpool.Pool) Querier {
	return &QuerierImpl{
		pool:    pool,
		Queries: db_driver.New(pool),
	}
}

func (q *QuerierImpl) Begin(ctx context.Context) (pgx.Tx, error) {
	return q.pool.Begin(ctx)
}

func (q *QuerierImpl) WithTx(tx pgx.Tx) Querier {
	return &QuerierImpl{
		pool:    q.pool,
		Queries: db_driver.New(tx),
	}
}
