import { useState, useEffect } from 'react';
import { Todo } from '@/domain/todo';
import { getTodos } from '@/useCase/getTodoUseCase';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (content: string) => {
    let newTodos = todos;
    newTodos.push({ id: Date.now().toString(), content: content, completed: false });
    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos().then((result) => {
      setTodos(result);
    });
  }, []);

  return { todos, addTodo };
};
