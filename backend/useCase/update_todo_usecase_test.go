package useCase

import (
	"context"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"github.com/google/uuid"
	"go.uber.org/mock/gomock"
)

func TestUpdateTodoUseCase_UpdateTodoUseCase(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockTodoPort := mock_port.NewMockTodoPort(ctrl)
	todo := domain.Todo{
		ID:        domain.TodoId(uuid.MustParse("56CD2629-3035-47EB-AA41-C8F25D5FC954")),
		Content:   domain.TodoContent("title1"),
		Completed: domain.TodoCompleted(true),
		UserId:    domain.NewUserId(),
	}

	ctx := context.Background()

	mockTodoPort.EXPECT().Update(ctx, todo).Return(nil)

	type fields struct {
		todoPort port.TodoPort
	}
	type args struct {
		ctx  context.Context
		todo domain.Todo
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "Todoの更新",
			fields: fields{
				todoPort: mockTodoPort,
			},
			args: args{
				ctx:  ctx,
				todo: todo,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &UpdateTodoUseCase{
				todoPort: tt.fields.todoPort,
			}
			if err := u.UpdateTodoUseCase(tt.args.ctx, tt.args.todo); (err != nil) != tt.wantErr {
				t.Errorf("UpdateTodoUseCase.UpdateTodoUseCase() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
