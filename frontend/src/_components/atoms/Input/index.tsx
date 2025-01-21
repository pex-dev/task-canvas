'use client';

import React from 'react';

import MuiTextField, { TextFieldProps as MuiInputProps } from '../../mui/TextField';

export type InputProps = Pick<MuiInputProps, 'onChange' | 'value' | 'error' | 'helperText'>;

const Input: React.FC<InputProps> = ({ onChange, value, error, helperText }) => {
  return (
    <MuiTextField
      value={value}
      onChange={onChange}
      placeholder="Add new .."
      error={error}
      helperText={helperText}
      sx={{
        boxShadow: 1,
        paddingLeft: 3,
        paddingRight: 6,
        borderRadius: 0.5,
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: '#FFF',
        '& .MuiOutlinedInput-notchedOutline': {
          borderStyle: 'none',
        },
      }}
    />
  );
};

export default Input;
