import React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Link, { LinkProps } from '@/_components/mui/Link';
import Box from '@/_components/mui/Box';
import MuiTypography from '@/_components/mui/Typography';

export type TitleProps = Pick<LinkProps, 'sx' | 'href'>;

const Title: React.FC<TitleProps> = ({ sx, href }) => {
  return (
    <Link
      href={href}
      sx={sx}
    >
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
          sx={{
            fontSize: '44px',
            color: '#4169e1',
            textDecoration: 'underline',
            textDecorationColor: '#4169e1',
          }}
        >
          My Todo-s
        </MuiTypography>
      </Box>
    </Link>
  );
};

export default Title;
