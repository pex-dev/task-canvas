import { SignIn } from '@/domain/signIn';
import { signIn as signInUseCase } from '@/useCase/signInUseCase';

type UseSignInResult = {
  signIn: ({ email, password }: SignIn) => Promise<void>;
};

const useSignIn = (): UseSignInResult => {
  const signIn = async ({ email, password }: SignIn): Promise<void> => {
    await signInUseCase({ email, password });
  };

  return { signIn };
};

export default useSignIn;
