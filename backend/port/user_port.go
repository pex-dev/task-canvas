package port

import "task-canvas/domain"

type UserPort interface {
	Store(user *domain.User) error
}
