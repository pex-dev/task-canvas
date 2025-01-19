import { forwardRef, memo, ReactNode } from 'react';

import TextField, { TextFieldProps as TextFieldPropsType } from '@/_components/mui/TextField';

const TextFieldWithIcon = memo(
  forwardRef<
    HTMLDivElement,
    Pick<
      TextFieldPropsType,
      | 'label'
      | 'placeholder'
      | 'error'
      | 'helperText'
      | 'value'
      | 'onChange'
      | 'type'
      | 'disabled'
      | 'name'
    > & {
      icon: ReactNode;
    }
  >(({ label, placeholder, icon, value, type, onChange, disabled, name }, ref) => (
    <TextField
      ref={ref}
      sx={{
        mb: {
          xs: 2,
          sm: 3,
        },
      }}
      label={label}
      name={name}
      required
      placeholder={placeholder}
      InputProps={{
        startAdornment: icon,
        sx: {
          fontSize: {
            xs: 10,
            sm: 14,
          },
        },
      }}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
    />
  )),
);

export default TextFieldWithIcon;
