'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/_components/contexts/SnackbarContext';
import TextFieldWithIcon from '@/_components/molecules/TextFieldWithIcon';
import Box from '@/_components/mui/Box';

import Button from '@/_components/mui/Button';
import Stack from '@/_components/mui/Stack';
import RegistrationFormBox from '@/_components/organisms/RegistrationFormBox';
import useSignIn from '@/hooks/useSignIn';

type InputProps = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { showError, showSuccess } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log(errors.password);

  const onSubmit: SubmitHandler<InputProps> = async (values) => {
    try {
      setIsLoading(true);
      await signIn(values);
      router.push('/');
      showSuccess('ログインに成功しました');
    } catch (error) {
      showError('ログインに失敗しました');
      console.error(error);
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
          rules={{ required: 'メールアドレスを入力してください' }}
          render={({ field, formState: { errors } }) => (
            <TextFieldWithIcon
              {...field}
              error={errors.email ? true : false}
              name="mail"
              label="メール"
              placeholder="メールを入力してください"
              type="email"
              helperText={errors.email ? errors.email.message : ''}
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
          rules={{ required: 'パスワードを入力してください' }}
          render={({ field, formState: { errors } }) => (
            <TextFieldWithIcon
              {...field}
              error={errors.password ? true : false}
              name="password"
              label="パスワード"
              type="password"
              placeholder="パスワードを入力してください"
              disabled={isLoading}
              helperText={errors.password ? errors.password.message : ''}
              icon={<LockIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
        {isLoading ? (
          <Box
            component={'div'}
            aria-busy={isLoading}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CircularProgress size={32} />
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            disabled={isLoading}
            type="submit"
          >
            サインイン
          </Button>
        )}
      </Stack>
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ width: 'fit-content', fontSize: 12 }}
          variant="text"
          onClick={() => {
            router.push('/signup');
          }}
        >
          サインアップ
          <ArrowForwardIcon sx={{ color: 'icon.blue', height: 16, wight: 16 }} />
        </Button>
      </Box>
    </RegistrationFormBox>
  );
};

export default SignIn;
