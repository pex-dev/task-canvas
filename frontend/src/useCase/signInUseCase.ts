import { SignIn } from "@/domain/signIn";
import SignInGateway from "@/gateway/signIn";

export const signIn = async ({ email, password }: SignIn): Promise<void> => {
  const userGateway = new SignInGateway()

  await userGateway.signIn(email, password)
}