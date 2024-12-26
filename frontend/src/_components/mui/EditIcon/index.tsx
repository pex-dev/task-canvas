import { Edit as MuiEditIcon } from '@mui/icons-material';

export type EditIconProps = React.ComponentProps<typeof MuiEditIcon>;

const EditIcon: React.FC<EditIconProps> = (props) => {
  return <MuiEditIcon {...props} />;
};

export default EditIcon;
