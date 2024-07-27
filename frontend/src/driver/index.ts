type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

type Todos = {
  todos: Todo[];
};

export const getTodos = async (): Promise<Todos> => {
  const response = await fetch('http://localhost:8080/v1/todos');
  const json = await response.json();

  return json;
};
