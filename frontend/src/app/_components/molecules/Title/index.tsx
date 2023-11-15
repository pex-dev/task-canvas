import React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Box from '../../mui/Box';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '../../mui/Typography';

export type TypographyProps = Pick<MuiTypographyProps, 'sx'>;

const Title: React.FC<TypographyProps> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CheckBoxIcon
        sx={{
          color: '#4169e1',
          fontSize: '60px',
          marginRight: '6px',
        }}
      />
      <MuiTypography
        sx={[
          {
            fontSize: '44px',
            color: '#4169e1',
            textDecoration: 'underline',
            textDecorationColor: '#4169e1',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        My Todo-s
      </MuiTypography>
    </Box>
  );
};

export default Title;
