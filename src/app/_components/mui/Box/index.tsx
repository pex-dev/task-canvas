import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export type BoxProps = MuiBoxProps;

const Box: React.FC<BoxProps> = (props) => {
  return <MuiBox {...props}>{props.children}</MuiBox>;
};

export default Box;
