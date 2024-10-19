package useCase

import (
	"context"
	"errors"
	"reflect"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"go.uber.org/mock/gomock"
)

func TestAuthJWTUseCase_Exec(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	t.Setenv("JWT_SECRET", "test_secret")

	ctx := context.Background()
	existUserId := domain.NewUserId()
	notExistUserId := domain.NewUserId()

	existUserJwtToken, _ := domain.NewUserJwtToken(&existUserId)
	notExistUserJwtToken, _ := domain.NewUserJwtToken(&notExistUserId)

	mockUserPort := mock_port.NewMockUserPort(ctrl)
	mockUserPort.EXPECT().FindById(ctx, &existUserId).Times(1).Return(&domain.User{}, nil)
	mockUserPort.EXPECT().FindById(ctx, &notExistUserId).Times(1).Return(nil, errors.New("user not found"))

	type fields struct {
		userPort port.UserPort
	}
	type args struct {
		ctx          context.Context
		userJWTToken *domain.UserJwtToken
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    domain.UserId
		wantErr bool
	}{
		{
			name: "JWTからユーザーIDを取得できる",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:          ctx,
				userJWTToken: &existUserJwtToken,
			},
			want: existUserId,
		},
		{
			name: "JWTからユーザーIDを取得できない際に401エラーを返す",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:          ctx,
				userJWTToken: &notExistUserJwtToken,
			},
			want:    domain.UserId{},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &AuthJWTUseCase{
				userPort: tt.fields.userPort,
			}
			got, err := u.Exec(tt.args.ctx, tt.args.userJWTToken)
			if (err != nil) != tt.wantErr {
				t.Errorf("AuthJWTUseCase.Exec() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AuthJWTUseCase.Exec() = %v, want %v", got, tt.want)
			}
		})
	}
}
