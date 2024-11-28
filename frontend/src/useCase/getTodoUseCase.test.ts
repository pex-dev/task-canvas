import { Todo } from '@/domain/todo';

import TodoGateway from '@/gateway/todo';

import { getTodos } from './getTodoUseCase';

vi.mock('@/gateway/todo', () => ({
  default: vi.fn(),
}));

describe('getTodoUseCase', () => {
  it('Todoを取得する', async () => {
    const mockTodos: Todo[] = [
      { id: '1', content: 'Todo 1', completed: false },
      { id: '2', content: 'Todo 2', completed: true },
    ];

    const mockGetTodos = vi.fn().mockResolvedValue(mockTodos);
    TodoGateway.prototype.getTodos = mockGetTodos;

    const todos = await getTodos();

    expect(todos).toEqual(mockTodos);
    expect(mockGetTodos).toHaveBeenCalledTimes(1);
  });
});
