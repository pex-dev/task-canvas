import { IconButton as MuiIconButton } from '@mui/material';

export type IconButtonProps = React.ComponentProps<typeof MuiIconButton>;

const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};

export default IconButton;
