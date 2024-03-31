import React from 'react';

import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '../../mui/Checkbox';

export type CheckboxProps = Pick<MuiCheckboxProps, 'sx' | 'checked' | 'onChange'>;

const Checkbox: React.FC<CheckboxProps> = ({ sx, onChange, checked }) => {
  return (
    <MuiCheckbox
      onChange={onChange}
      checked={checked}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

export default Checkbox;
