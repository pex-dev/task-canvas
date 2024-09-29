package gateway

import (
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/port"
)

type UserGateway struct {
	db_driver db_driver.Querier
}

func NewUserGateway(db_driver db_driver.Querier) port.UserPort {
	return &UserGateway{
		db_driver: db_driver,
	}
}

func (g *UserGateway) Store(user *domain.User) error {
	return nil
}
