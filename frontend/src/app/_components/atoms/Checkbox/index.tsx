'use client';

import React from 'react';

import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '../../mui/Checkbox';

export type CheckboxProps = Pick<MuiCheckboxProps, 'sx'>;

const Checkbox: React.FC<CheckboxProps> = ({ sx }) => {
  return <MuiCheckbox sx={[...(Array.isArray(sx) ? sx : [sx])]} />;
};

export default Checkbox;
