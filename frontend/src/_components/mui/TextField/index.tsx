import React, { forwardRef } from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

const TextFiled = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  return (
    <MuiTextField
      {...props}
      ref={ref}
    />
  );
});

TextFiled.displayName = 'TextFiled';

export default TextFiled;
