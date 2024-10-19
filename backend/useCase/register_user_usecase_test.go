package useCase

import (
	"context"
	"reflect"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"github.com/agiledragon/gomonkey/v2"
	"github.com/google/uuid"
	"go.uber.org/mock/gomock"
)

func TestRegisterUserCase_Exec(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	ctx := context.Background()
	mockUserPort := mock_port.NewMockUserPort(ctrl)
	mockUserId := domain.UserId(uuid.New())
	patches := gomonkey.ApplyFunc(domain.NewUserId, func() domain.UserId {
		return mockUserId
	})
	defer patches.Reset()

	mockJwtToken, _ := domain.NewUserJwtToken(&mockUserId)
	patchesJwtToken := gomonkey.ApplyFunc(domain.NewUserJwtToken, func(*domain.UserId) (domain.UserJwtToken, error) {
		return mockJwtToken, nil
	})
	defer patchesJwtToken.Reset()

	email := domain.Email("test@test.com")
	password := domain.Password("password")
	mockPasswordHash, _ := domain.HashPassword(password)
	patchesHashPassword := gomonkey.ApplyFunc(domain.HashPassword, func(domain.Password) (domain.PasswordHash, error) {
		return mockPasswordHash, nil
	})
	defer patchesHashPassword.Reset()

	user := domain.User{
		Id:           mockUserId,
		Email:        email,
		PasswordHash: mockPasswordHash,
	}
	mockUserPort.EXPECT().Store(ctx, &user).Times(1).Return(nil)

	type fields struct {
		userPort port.UserPort
	}
	type args struct {
		ctx      context.Context
		email    domain.Email
		password domain.Password
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    domain.UserJwtToken
		wantErr bool
	}{
		{
			name: "ユーザーの新規登録をしてjwtを返す",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:      ctx,
				email:    email,
				password: password,
			},
			want:    mockJwtToken,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &RegisterUserCase{
				userPort: tt.fields.userPort,
			}
			got, err := u.Exec(tt.args.ctx, tt.args.email, tt.args.password)
			if (err != nil) != tt.wantErr {
				t.Errorf("RegisterUserCase.Exec() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RegisterUserCase.Exec() = %v, want %v", got, tt.want)
			}
		})
	}
}
