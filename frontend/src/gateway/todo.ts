import { Todo } from '@/domain/todo';
import {
  getTodos as getTodosDriver,
  createTodo as createTodoDriver,
  CreateDriverRequest,
  updateTodoDriver,
  UpdateDriverRequest,
} from '@/driver';


interface TodoGatewayInterface {
  getTodos: () => Promise<Todo[]>;
  createTodo: (content: Todo['content'], completed: Todo['completed']) => Promise<Todo>;
  updateTodo: (
    id: Todo['id'],
    content: Todo['content'],
    completed: Todo['completed'],
  ) => Promise<void>;
}

export default class TodoGateway implements TodoGatewayInterface {
  async getTodos(): Promise<Todo[]> {
    const driverTodos = await getTodosDriver();

    const todos = (driverTodos ?? []).map((driverTodo) => {
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

  async updateTodo(
    id: Todo['id'],
    content: Todo['content'],
    completed: Todo['completed'],
  ): Promise<void> {
    const updateTodoForDriver: UpdateDriverRequest = {
      id: id,
      content: content,
      completed: completed,
    };

    await updateTodoDriver(updateTodoForDriver);
  }
}
