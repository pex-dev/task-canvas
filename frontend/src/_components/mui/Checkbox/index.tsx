import React from 'react';

import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material';

export type CheckboxProps = MuiCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MuiCheckbox {...props} />;
};

export default Checkbox;
