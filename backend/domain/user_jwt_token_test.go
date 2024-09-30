package domain

import (
	"os"
	"reflect"
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestNewUserJwtToken(t *testing.T) {
	userIdUuid := uuid.New()
	userId := UserId(userIdUuid)

	type args struct {
		userId *UserId
	}
	tests := []struct {
		name    string
		args    args
		want    UserJwtToken
		wantErr bool
	}{
		{
			name: "JWT_SECRETが取得できない場合はエラーを返す",
			args: args{
				userId: &userId,
			},
			want:    "",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewUserJwtToken(tt.args.userId)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewUserJwtToken() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("NewUserJwtToken() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestUserJwtToken_ValidateJWT(t *testing.T) {
	os.Setenv("JWT_SECRET", "test_secret")
	defer os.Unsetenv("JWT_SECRET")

	validUserId := NewUserId()
	expiredUserId := NewUserId()

	validToken, _ := NewUserJwtToken(&validUserId)

	expiredToken, _ := NewUserJwtToken(&expiredUserId)
	time.Sleep(1 * time.Second)

	tests := []struct {
		name    string
		tr      UserJwtToken
		want    *UserId
		wantErr bool
	}{
		{
			name:    "有効なトークンの場合はユーザーIDを返す",
			tr:      validToken,
			want:    &validUserId,
			wantErr: false,
		},
		{
			name:    "期限切れのトークンの場合、エラーを返す",
			tr:      expiredToken,
			want:    nil,
			wantErr: true,
		},
		{
			name:    "無効なトークンの場合、エラーを返す",
			tr:      UserJwtToken("invalid_token"),
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.tr.ValidateJWT()
			if (err != nil) != tt.wantErr {
				t.Errorf("UserJwtToken.ValidateJWT() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("UserJwtToken.ValidateJWT() = %v, want %v", got, tt.want)
			}
		})
	}
}
