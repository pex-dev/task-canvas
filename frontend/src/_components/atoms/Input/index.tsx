import React from 'react';

import MuiTextField, { TextFieldProps as MuiInputProps } from '../../mui/TextField';

type InputProps = MuiInputProps;

const Input: React.FC<InputProps> = () => {
  return (
    <MuiTextField
      placeholder="Add new .."
      sx={{
        boxShadow: 1,
        paddingLeft: 3,
        paddingRight: 6,
        borderRadius: 0.5,
        boxSizing: 'border-box',
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
          borderStyle: 'none',
        },
      }}
    />
  );
};

export default Input;
