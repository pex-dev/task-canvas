import React from 'react';

import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export type TypographyProps = MuiTypographyProps;

const Typography: React.FC<TypographyProps> = (props) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};

export default Typography;
