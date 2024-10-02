package domain

import (
	"testing"
)

func TestHashPassword(t *testing.T) {
	type args struct {
		password Password
	}
	tests := []struct {
		name    string
		args    args
		want    PasswordHash
		wantErr bool
	}{
		{
			name: "パスワードが空の場合にエラーを返す",
			args: args{
				password: Password(""),
			},
			want:    PasswordHash(""),
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := HashPassword(tt.args.password)
			if (err != nil) != tt.wantErr {
				t.Errorf("HashPassword() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("HashPassword() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestPasswordHash_ComparePasswordHash(t *testing.T) {
	password := Password("password")
	notExistPassword := Password("notExistPassword")
	passwordHash, _ := HashPassword(password)

	type args struct {
		targetPassword Password
	}
	tests := []struct {
		name string
		ph   *PasswordHash
		args args
		want bool
	}{
		{
			name: "パスワードが一致する場合はtrueを返す",
			ph:   &passwordHash,
			args: args{
				targetPassword: password,
			},
			want: true,
		},
		{
			name: "パスワードが一致しない場合はfalseを返す",
			ph:   &passwordHash,
			args: args{
				targetPassword: notExistPassword,
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.ph.ComparePasswordHash(tt.args.targetPassword); got != tt.want {
				t.Errorf("PasswordHash.ComparePasswordHash() = %v, want %v", got, tt.want)
			}
		})
	}
}
