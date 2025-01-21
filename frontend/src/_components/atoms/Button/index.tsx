import React from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '../../mui/Button';

export type ButtonProps = Pick<MuiButtonProps, 'children' | 'sx' | 'onClick' | 'disabled' | 'type'>;

const Button: React.FC<ButtonProps> = ({ children, sx, onClick, disabled, type }) => {
  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      type={type}
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
