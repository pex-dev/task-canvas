import { renderHook, act, waitFor } from '@testing-library/react';

import { useTodo } from '@/hooks/useTodo';
import { createTodo } from '@/useCase/createTodoUseCase';
import { getTodos } from '@/useCase/getTodoUseCase';
import { updateTodo as updateTodoUseCase } from '@/useCase/updateTodoUseCase';

vi.mock('@/useCase/createTodoUseCase', () => ({
  createTodo: vi.fn(),
}));

vi.mock('@/useCase/getTodoUseCase', () => ({
  getTodos: vi.fn(),
}));

vi.mock('@/useCase/updateTodoUseCase', () => ({
  updateTodo: vi.fn(),
}));

const mockCreateTodo = vi.mocked(createTodo);
const mockGetTodos = vi.mocked(getTodos);
const mockUpdateTodoUseCase = vi.mocked(updateTodoUseCase);

describe('useTodo', () => {
  it('マウント時にTodoを取得する', async () => {
    const mockTodos = [
      { id: '1', content: 'Todo 1', completed: false },
      { id: '2', content: 'Todo 2', completed: true },
    ];
    mockGetTodos.mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodo());

    await waitFor(() => expect(result.current.todos).toEqual(mockTodos));

    expect(result.current.todos).toEqual(mockTodos);
  });

  it('新しいTodoを追加する', async () => {
    const newTodo = { id: '3', content: 'New Todo', completed: false };
    mockCreateTodo.mockResolvedValue(newTodo);

    const { result } = renderHook(() => useTodo());

    await act(async () => {
      result.current.addTodo(newTodo.content);
    });

    expect(result.current.todos).toContainEqual(newTodo);
  });

  it('既存のTodoを更新する', async () => {
    const initialTodos = [
      { id: '1', content: 'Todo 1', completed: false },
      { id: '2', content: 'Todo 2', completed: true },
    ];
    mockGetTodos.mockResolvedValue(initialTodos);

    const { result } = renderHook(() => useTodo());

    await waitFor(() => expect(result.current.todos).toEqual(initialTodos));

    const updatedTodo = { ...initialTodos[0], completed: true };
    mockUpdateTodoUseCase.mockResolvedValue();

    await act(async () => {
      result.current.updateTodo(updatedTodo.id, updatedTodo.content, updatedTodo.completed);
    });

    expect(result.current.todos).toContainEqual(updatedTodo);
  });
});
