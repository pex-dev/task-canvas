package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var PgPool *pgxpool.Pool

func init() {
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", user, password, host, port, dbname)

	conn, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	if err = conn.Ping(context.Background()); err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	PgPool = conn
}
