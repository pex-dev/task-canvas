import { useState, useEffect } from 'react';
import { Todo } from '@/domain/todo';
import { getTodos } from '@/useCase/getTodoUseCase';
import { createTodo } from '@/useCase/createTodoUseCase';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (content: string) => {
    createTodo(content).then((result) => {
      setTodos([...todos, result]);
    });
  };

  useEffect(() => {
    getTodos().then((result) => {
      setTodos(result);
    });
  }, []);

  return { todos, addTodo };
};
