import { SignUp } from "@/domain/signUp";
import { signUp as signUpUseCase } from "@/useCase/signUpUseCase";


type UseSignUpResult = {
  signUp: ({email, password}: SignUp) => Promise<void>;
}

const useSignUp = (): UseSignUpResult => {
  const signUp = async ({ email, password }: SignUp): Promise<void> => {
    await signUpUseCase({ email, password });
  }

  return { signUp };
}

export default useSignUp;