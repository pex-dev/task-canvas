include .env
export $(shell sed 's/=.*//' .env)

seed:
	docker exec -it $(POSTGRES_HOST) bash -c "PGPASSWORD=$(POSTGRES_PASSWORD) psql -h localhost -U $(POSTGRES_USER) -d $(POSTGRES_DB) -f /backend/app/database/seeds/0_todo.sql"