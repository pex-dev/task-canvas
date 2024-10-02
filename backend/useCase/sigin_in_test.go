package useCase

import (
	"context"
	"os"
	"reflect"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"go.uber.org/mock/gomock"
)

func TestSignInUseCase_Exec(t *testing.T) {
	os.Setenv("JWT_SECRET", "test-secret")
	defer os.Unsetenv("JWT_SECRET")

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	ctx := context.Background()

	userId := domain.NewUserId()
	email := domain.Email("test@test.com")
	notExistEmail := domain.Email("not-exist-test@test.com")
	password := domain.Password("password")
	notExistPassword := domain.Password("notExistPassword")
	passwordHash, _ := domain.HashPassword(password)

	user := domain.User{
		Id:           userId,
		Email:        email,
		PasswordHash: passwordHash,
	}

	mockUserPort := mock_port.NewMockUserPort(ctrl)
	mockUserPort.EXPECT().FindByEmail(ctx, email).Times(2).Return(&user, nil)
	mockUserPort.EXPECT().FindByEmail(ctx, notExistEmail).Times(1).Return(nil, domain.ErrUserNotFound)

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
		want    *domain.UserId
		wantErr bool
	}{
		{
			name: "ユーザーが存在する場合はユーザーIDを返す",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:      ctx,
				email:    email,
				password: password,
			},
			want: &userId,
		},
		{
			name: "存在しないユーザーの場合はエラーを返す",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:      ctx,
				email:    notExistEmail,
				password: notExistPassword,
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "ユーザーが存在するがパスワードが間違っている場合はエラーを返す",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:      ctx,
				email:    email,
				password: notExistPassword,
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &SignInUseCase{
				userPort: tt.fields.userPort,
			}
			got, err := u.Exec(tt.args.ctx, tt.args.email, tt.args.password)
			if (err != nil) != tt.wantErr {
				t.Errorf("SignInUseCase.Exec() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("SignInUseCase.Exec() = %v, want %v", got, tt.want)
			}
		})
	}
}
