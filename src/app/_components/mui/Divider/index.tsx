import React from 'react';

import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material';

export type DividerProps = MuiDividerProps;

const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />;
};

export default Divider;
