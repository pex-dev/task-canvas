import React, { useState } from 'react';

import Checkbox from '@/_components/atoms/Checkbox';
import Box from '@/_components/mui/Box';
import IconButton from '@/_components/mui/IconButton';
import Typography from '@/_components/mui/Typography';
import EditIcon from '@/_components/mui/EditIcon';

export type TodoCardProps = {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ checked, onChange, text }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const visibleEditIcon: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(true);
  };

  const hiddenEditIcon: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(false);
  };

  return (
    <Box
      onMouseOver={visibleEditIcon}
      onMouseLeave={hiddenEditIcon}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '24px',
            marginLeft: '12px',
          }}
        >
          {text}
        </Typography>
        {isHover && (
          <IconButton
            sx={{
              marginRight: '12px',
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TodoCard;
