'use client';
import { memo, forwardRef, ReactNode, useState } from 'react';

import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Box from '@/_components/mui/Box';
import Button from '@/_components/mui/Button';
import Stack from '@/_components/mui/Stack';
import TextField, { TextFieldProps as TextFieldPropsType } from '@/_components/mui/TextField';
import RegistrationFormBox from '@/_components/organisms/RegistrationFormBox';
import useSignUp from '@/hooks/useSignUp';
import { useSnackbar } from '@/_components/contexts/SnackbarContext';

const TextFieldWithIcon = memo(
  forwardRef<
    HTMLDivElement,
    Pick<
      TextFieldPropsType,
      'label' | 'placeholder' | 'error' | 'helperText' | 'value' | 'onChange' | 'type' | 'disabled'
    > & {
      icon: ReactNode;
    }
  >(({ label, placeholder, icon, value, type, onChange, disabled }, ref) => (
    <TextField
      ref={ref}
      sx={{
        mb: {
          xs: 2,
          sm: 3,
        },
      }}
      label={label}
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

type InputProps = {
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const { showError, showSuccess } = useSnackbar();
  const { signUp } = useSignUp();
  const { control, handleSubmit, resetField } = useForm<InputProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = async (values) => {
    try {
      setIsLoading(true);
      await signUp(values);
      router.push('/signin');
      showSuccess('アカウント作成に成功しました');
    } catch (e) {
      showError('アカウント作成に失敗しました');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationFormBox description="ユーザー情報を入力してください。">
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="メール"
              placeholder="メールを入力してください"
              type="email"
              disabled={isLoading}
              icon={
                <MailOutlineIcon
                  sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }}
                />
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード"
              type="password"
              placeholder="パスワードを入力してください"
              disabled={isLoading}
              icon={<LockIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
        {isLoading ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            disabled={isLoading}
            type="submit"
          >
            アカウントを作成する
          </Button>
        )}
      </Stack>
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          sx={{ width: 'fit-content', fontSize: 12 }}
          variant="text"
          onClick={() => {
            router.push('/signin');
          }}
        >
          <ArrowBackIcon sx={{ color: 'icon.blue', height: 16, wight: 16, mr: 1 }} />
          サインアップ
        </Button>
      </Box>
    </RegistrationFormBox>
  );
};

export default SignUp;
