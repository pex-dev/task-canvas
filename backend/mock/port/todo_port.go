// Code generated by MockGen. DO NOT EDIT.
// Source: port/todo_port.go
//
// Generated by this command:
//
//	mockgen -source=port/todo_port.go -destination=mock/port/todo_port.go
//

// Package mock_port is a generated GoMock package.
package mock_port

import (
	context "context"
	reflect "reflect"
	domain "task-canvas/domain"

	gomock "go.uber.org/mock/gomock"
)

// MockTodoPort is a mock of TodoPort interface.
type MockTodoPort struct {
	ctrl     *gomock.Controller
	recorder *MockTodoPortMockRecorder
}

// MockTodoPortMockRecorder is the mock recorder for MockTodoPort.
type MockTodoPortMockRecorder struct {
	mock *MockTodoPort
}

// NewMockTodoPort creates a new mock instance.
func NewMockTodoPort(ctrl *gomock.Controller) *MockTodoPort {
	mock := &MockTodoPort{ctrl: ctrl}
	mock.recorder = &MockTodoPortMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockTodoPort) EXPECT() *MockTodoPortMockRecorder {
	return m.recorder
}

// Delete mocks base method.
func (m *MockTodoPort) Delete(ctx context.Context, id domain.TodoId) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// Delete indicates an expected call of Delete.
func (mr *MockTodoPortMockRecorder) Delete(ctx, id any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockTodoPort)(nil).Delete), ctx, id)
}

// Get mocks base method.
func (m *MockTodoPort) Get(ctx context.Context, userId domain.UserId) ([]domain.Todo, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Get", ctx, userId)
	ret0, _ := ret[0].([]domain.Todo)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Get indicates an expected call of Get.
func (mr *MockTodoPortMockRecorder) Get(ctx, userId any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Get", reflect.TypeOf((*MockTodoPort)(nil).Get), ctx, userId)
}

// Store mocks base method.
func (m *MockTodoPort) Store(ctx context.Context, todo domain.Todo) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Store", ctx, todo)
	ret0, _ := ret[0].(error)
	return ret0
}

// Store indicates an expected call of Store.
func (mr *MockTodoPortMockRecorder) Store(ctx, todo any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Store", reflect.TypeOf((*MockTodoPort)(nil).Store), ctx, todo)
}

// Update mocks base method.
func (m *MockTodoPort) Update(ctx context.Context, todo domain.Todo) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Update", ctx, todo)
	ret0, _ := ret[0].(error)
	return ret0
}

// Update indicates an expected call of Update.
func (mr *MockTodoPortMockRecorder) Update(ctx, todo any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Update", reflect.TypeOf((*MockTodoPort)(nil).Update), ctx, todo)
}
