'use client';

import { useState } from 'react';
import Box from '@/_components/mui/Box';
import Container from '@/_components/mui/Container';
import Input, { InputProps } from '@/_components/atoms/Input';
import Button from '@/_components/atoms/Button';
import Title from '@/_components/molecules/Title';
import TodoCard, { TodoCardProps } from '@/_components/molecules/TodoCard';

type Todo = {
  id: string;
  completed: boolean;
  text: string;
};

const Top = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChangeText: InputProps['onChange'] = (event) => {
    setValue(event.target.value);
  };

  const handleCreateTodo = (value: string) => {
    setTodos([...todos, { id: Date.now().toString(), completed: false, text: value }]);

    setValue('');
  };

  const handleChangeCheckbox = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          completed: newChecked,
          text: todo.text,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        height: '100vh',
        width: '100vw',
        paddingTop: '60px',
      }}
    >
      <Container maxWidth={'lg'}>
        <Box
          sx={{
            width: '100%',
            minHeight: 500,
            backgroundColor: '#F8F9FA',
            boxShadow: 7,
            borderRadius: 1,
            padding: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <Title href="/" />
          </Box>
          <Input
            value={value}
            onChange={handleChangeText}
          />
          <Button
            disabled={!value}
            onClick={() => handleCreateTodo(value)}
          >
            Add
          </Button>
          {todos.map((todo, i) => {
            return (
              <TodoCard
                text={todo.text}
                checked={todo.completed}
                onChange={(event) => {
                  handleChangeCheckbox(todo.id, event);
                }}
                key={i}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Top;
