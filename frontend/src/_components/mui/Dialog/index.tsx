import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export type DialogProps = MuiDialogProps;

const Dialog: React.FC<DialogProps> = (props) => {
  return <MuiDialog {...props}>{props.children}</MuiDialog>;
};

export default Dialog;
