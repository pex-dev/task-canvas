package useCase

import (
	"context"
	"errors"
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
		setup   func()
		args    args
		wantErr bool
	}{
		{
			name: "Todoの更新に成功",
			fields: fields{
				todoPort: mockTodoPort,
			},
			args: args{
				ctx:  ctx,
				todo: todo,
			},
			setup: func() {
				mockTodoPort.EXPECT().Update(ctx, todo).Return(nil).Times(1)
			},
			wantErr: false,
		},
		{
			name: "Todoの更新に失敗したらエラーを返す",
			fields: fields{
				todoPort: mockTodoPort,
			},
			args: args{
				ctx:  ctx,
				todo: todo,
			},
			setup: func() {
				mockTodoPort.EXPECT().Update(ctx, todo).Return(errors.New("error")).Times(1)
			},
			wantErr: true,
		},
		{
			name: "コンテキストがキャンセルされたらエラーを返す",
			fields: fields{
				todoPort: mockTodoPort,
			},
			args: args{
				ctx:  ctx,
				todo: todo,
			},
			setup: func() {
				mockTodoPort.EXPECT().Update(ctx, todo).Return(context.Canceled).Times(1)
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.setup()
			u := &UpdateTodoUseCase{
				todoPort: tt.fields.todoPort,
			}
			if err := u.UpdateTodoUseCase(tt.args.ctx, tt.args.todo); (err != nil) != tt.wantErr {
				t.Errorf("UpdateTodoUseCase.UpdateTodoUseCase() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
