import React from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '../../mui/Button';

export type ButtonProps = Pick<MuiButtonProps, 'children' | 'sx' | 'onClick' | 'disabled'>;

const Button: React.FC<ButtonProps> = ({ children, sx, onClick, disabled }) => {
  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      sx={[
        {
          textTransform: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
