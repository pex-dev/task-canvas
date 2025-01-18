import React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Box from '@/_components/mui/Box';
import Link, { LinkProps } from '@/_components/mui/Link';
import Typography from '@/_components/mui/Typography';

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
        <Typography
          component={'h1'}
          sx={{
            fontSize: '44px',
            color: '#4169e1',
            textDecoration: 'underline',
            textDecorationColor: '#4169e1',
          }}
        >
          My Todo-s
        </Typography>
      </Box>
    </Link>
  );
};

export default Title;
