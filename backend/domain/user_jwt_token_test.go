package domain

import (
	"testing"

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
