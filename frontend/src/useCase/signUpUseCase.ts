import { SignUp } from '@/domain/signUp';
import SignUpGateway from '@/gateway/signUp';

export const signUp = async ({ email, password }: SignUp): Promise<void> => {
  const userGateway = new SignUpGateway();

  await userGateway.signUp(email, password);
};
