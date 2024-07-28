package useCase

import (
	"context"
	"reflect"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"github.com/google/uuid"
	"go.uber.org/mock/gomock"
)

func TestStoreTodoUseCase_Store(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockTodoPort := mock_port.NewMockTodoPort(ctrl)
	mockTodoIdPort := mock_port.NewMockTodoIdPort(ctrl)

	todoId := domain.TodoId(uuid.MustParse("56CD2629-3035-47EB-AA41-C8F25D5FC954"))
	mockTodoIdPort.EXPECT().Generate(context.Background()).Return(todoId, nil)

	todoContent := domain.TodoContent("title1")
	todoCompleted := domain.TodoCompleted(true)

	todo := domain.Todo{
		ID:        todoId,
		Content:   todoContent,
		Completed: todoCompleted,
	}
	mockTodoPort.EXPECT().Store(context.Background(), todo).Return(nil)

	type fields struct {
		todoPort   port.TodoPort
		todoIdPort port.TodoIdPort
	}
	type args struct {
		ctx       context.Context
		content   domain.TodoContent
		completed domain.TodoCompleted
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    domain.TodoId
		wantErr bool
	}{
		{
			name: "Todoの作成",
			fields: fields{
				todoPort:   mockTodoPort,
				todoIdPort: mockTodoIdPort,
			},
			args: args{
				ctx:       context.Background(),
				content:   todoContent,
				completed: todoCompleted,
			},
			want:    todoId,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &StoreTodoUseCase{
				todoPort:   tt.fields.todoPort,
				todoIdPort: tt.fields.todoIdPort,
			}
			got, err := u.Store(tt.args.ctx, tt.args.content, tt.args.completed)
			if (err != nil) != tt.wantErr {
				t.Errorf("StoreTodoUseCase.Store() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("StoreTodoUseCase.Store() = %v, want %v", got, tt.want)
			}
		})
	}
}
