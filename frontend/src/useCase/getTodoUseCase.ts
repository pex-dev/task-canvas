import { Todo } from '@/domain/todo';
import TodoGateway from '@/gateway/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const todoGateway = new TodoGateway();

  return await todoGateway.getTodos();
};
