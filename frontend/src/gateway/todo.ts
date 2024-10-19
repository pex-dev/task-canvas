import {
  getTodos as getTodosDriver,
  createTodo as createTodoDriver,
  CreateDriverRequest,
} from '@/driver';
import { Todo } from '@/domain/todo';

interface TodoGatewayInterface {
  getTodos: () => Promise<Todo[]>;
  createTodo: (content: Todo['content'], completed: Todo['completed']) => Promise<Todo>;
}

export default class TodoGateway implements TodoGatewayInterface {
  async getTodos(): Promise<Todo[]> {
    const driverTodos = await getTodosDriver();

    const todos = (driverTodos.todos ?? []).map((driverTodo) => {
      const todo: Todo = {
        id: driverTodo.id,
        content: driverTodo.content,
        completed: driverTodo.completed,
      };

      return todo;
    });

    return todos;
  }

  async createTodo(content: Todo['content'], completed: Todo['completed']): Promise<Todo> {
    const requestTodo: CreateDriverRequest = {
      content: content,
      completed: completed,
    };

    const driverTodoId = await createTodoDriver(requestTodo);

    const todo: Todo = {
      id: driverTodoId,
      content: content,
      completed: completed,
    };

    return todo;
  }
}
