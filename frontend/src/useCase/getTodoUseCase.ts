import TodoGateway from '@/gateway/todo';
import { Todo } from '@/domain/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const todoGateway = new TodoGateway();

  return await todoGateway.getTodos();
};
