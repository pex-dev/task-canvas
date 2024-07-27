import { getTodos as getTodosDriver } from '@/driver';
import { Todo } from '@/domain/todo';

interface TodoGatewayInterface {
  getTodos: () => Promise<Todo[]>;
}

export default class TodoGateway implements TodoGatewayInterface {
  async getTodos(): Promise<Todo[]> {
    const driverTodos = await getTodosDriver();

    const todos = driverTodos.todos.map((driverTodo) => {
      const todo: Todo = {
        id: driverTodo.id,
        content: driverTodo.content,
        completed: driverTodo.completed,
      };

      return todo;
    });

    return todos;
  }
}
