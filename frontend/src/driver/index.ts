type DriverTodo = {
  id: string;
  content: string;
  completed: boolean;
};

type DriverTodos = {
  todos: DriverTodo[];
};

export type CreateDriverRequest = {
  content: string;
  completed: boolean;
};

type CreateTodoResult = string;

export const getTodos = async (): Promise<DriverTodos> => {
  const response = await fetch('http://localhost:8080/v1/todos');
  const json = await response.json();

  return json;
};

export const createTodo = async ({
  content,
  completed,
}: CreateDriverRequest): Promise<CreateTodoResult> => {
  const response = await fetch('http://localhost:8080/v1/todos', {
    method: 'POST',
    body: JSON.stringify({
      content: content,
      completed: completed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  return json.id;
};
