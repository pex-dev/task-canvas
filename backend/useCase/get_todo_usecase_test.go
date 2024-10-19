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

func TestGetTodoUseCase_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockTodoPort := mock_port.NewMockTodoPort(ctrl)

	userId := domain.NewUserId()

	todos := []domain.Todo{
		{ID: domain.TodoId(uuid.MustParse("56CD2629-3035-47EB-AA41-C8F25D5FC954")), Content: "title1", Completed: true, UserId: userId},
		{ID: domain.TodoId(uuid.MustParse("97A46613-0E12-4A7F-B40E-57CF55EEFC84")), Content: "title2", Completed: true, UserId: userId},
		{ID: domain.TodoId(uuid.MustParse("10CE7F14-8B10-45C8-87E1-810008AE1ED7")), Content: "title3", Completed: true, UserId: userId},
	}

	mockTodoPort.EXPECT().Get(context.Background(), userId).Return(todos, nil)

	type fields struct {
		todoPort port.TodoPort
	}
	type args struct {
		ctx    context.Context
		userId domain.UserId
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    []domain.Todo
		wantErr bool
	}{
		{
			name: "Todo一覧の取得",
			fields: fields{
				todoPort: mockTodoPort,
			},
			args: args{
				ctx:    context.Background(),
				userId: userId,
			},
			want:    todos,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &GetTodoUseCase{
				todoPort: tt.fields.todoPort,
			}
			got, err := u.Get(tt.args.ctx, tt.args.userId)
			if (err != nil) != tt.wantErr {
				t.Errorf("GetTodoUseCase.Get(%v) error = %v, wantErr %v", tt.args.ctx, err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GetTodoUseCase.Get(%v) = %v, want %v", tt.args.ctx, got, tt.want)
			}
		})
	}
}
