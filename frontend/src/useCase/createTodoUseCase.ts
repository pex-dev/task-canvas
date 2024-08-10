import { Todo } from '@/domain/todo';
import TodoGateway from '@/gateway/todo';

export const createTodo = (content: Todo['content']): Promise<Todo> => {
  const todoGateway = new TodoGateway();

  const completed = false;
  const todo = todoGateway.createTodo(content, completed).then((result) => {
    return result;
  });
  return todo;
};
