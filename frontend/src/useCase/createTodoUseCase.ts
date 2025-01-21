import { Todo } from '@/domain/todo';
import TodoGateway from '@/gateway/todo';

export const createTodo = async (content: Todo['content']): Promise<Todo> => {
  const todoGateway = new TodoGateway();
  const completed = false;

  return await todoGateway.createTodo(content, completed);
};
