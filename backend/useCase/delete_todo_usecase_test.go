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

func TestDeleteTodoUseCase_Delete(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	ctx := context.Background()
	todoId := domain.TodoId(uuid.MustParse("F4592CB3-084B-484F-B4EF-9C726091D16D"))
	userId := domain.NewUserId()

	mockPort := mock_port.NewMockTodoPort(ctrl)
	mockPort.EXPECT().Delete(ctx, todoId, userId).Return(nil).Times(1)

	type fields struct {
		todoPort port.TodoPort
	}
	type args struct {
		ctx    context.Context
		todoId domain.TodoId
		userId domain.UserId
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "Delete Todo",
			fields: fields{
				todoPort: mockPort,
			},
			args: args{
				ctx:    ctx,
				todoId: todoId,
				userId: userId,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &DeleteTodoUseCase{
				todoPort: tt.fields.todoPort,
			}
			if err := u.Delete(tt.args.ctx, tt.args.todoId, tt.args.userId); (err != nil) != tt.wantErr {
				t.Errorf("DeleteTodoUseCase.Delete() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
