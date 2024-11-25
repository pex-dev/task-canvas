import React from 'react';

import Checkbox from '@/_components/atoms/Checkbox';
import Box from '@/_components/mui/Box';
import Typography from '@/_components/mui/Typography';

export type TodoCardProps = {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ checked, onChange, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          bgcolor: 'White',
        },
      }}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        sx={{
          '.MuiSvgIcon-root': {
            fontSize: 32,
          },
        }}
      />
      <Typography
        sx={{
          fontSize: '24px',
          marginLeft: '12px',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default TodoCard;
