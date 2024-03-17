import React from 'react';

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

const TextFiled: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField {...props} />;
};

export default TextFiled;
