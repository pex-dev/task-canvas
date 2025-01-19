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
      | 'required'
    > & {
      icon: ReactNode;
    }
  >(
    (
      { label, placeholder, helperText, icon, value, type, onChange, disabled, name, required },
      ref,
    ) => (
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
        required={required}
        helperText={helperText}
        placeholder={placeholder}
        slotProps={{
          input: {
            'aria-invalid': true,
            startAdornment: icon,
            sx: {
              fontSize: {
                xs: 10,
                sm: 14,
              },
            },
          },
        }}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        error={!!helperText}
      />
    ),
  ),
);

export default TextFieldWithIcon;
