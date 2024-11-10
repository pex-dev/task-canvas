import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { JSX } from 'react';

export type AlertPropsType = AlertProps;

const Alert = (props: AlertPropsType): JSX.Element => (
  <MuiAlert {...props}>{props.children}</MuiAlert>
);

export default Alert;
