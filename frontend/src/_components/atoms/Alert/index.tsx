import { FC } from 'react';
import { Theme, SxProps } from '@mui/material';

import MuiAlert, { AlertPropsType as AlertProps } from '@/_components/mui/Alert';

export type AlertPropsType = Pick<AlertProps, 'severity' | 'children' | 'sx'>;

const Alert: FC<AlertProps> = ({ sx, severity, children }) => (
  <MuiAlert
    sx={
      [
        {
          width: 160,
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        },
        ...(Array.isArray(sx) ? (sx as SxProps<Theme>[]) : ([sx] as SxProps<Theme>[])),
      ] as SxProps<Theme>
    }
    severity={severity}
  >
    {children}
  </MuiAlert>
);

export default Alert;
