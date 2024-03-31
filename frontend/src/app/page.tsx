'use client';

import { useState } from 'react';
import Box from '@/_components/mui/Box';
import Container from '@/_components/mui/Container';
import Input, { InputProps } from '@/_components/atoms/Input';
import Button from '@/_components/atoms/Button';
import Title from '@/_components/molecules/Title';

const Top = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  const handleChange: InputProps['onChange'] = (event) => {
    setValue(event.target.value);
  };

  const handleCreateTodo = (value: string) => {
    setTodos([...todos, value]);
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
            height: 300,
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
          <Input onChange={handleChange} />
          <Button onClick={() => handleCreateTodo(value)}>Add</Button>
          {todos.map((todo, i) => {
            return <div key={i}>{todo}</div>;
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Top;
