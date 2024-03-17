import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export type ContainerProps = MuiContainerProps;

const Container: React.FC<ContainerProps> = (props) => {
  return <MuiContainer {...props}>{props.children}</MuiContainer>;
};

export default Container;
