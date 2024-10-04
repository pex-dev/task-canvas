import { SignIn } from "@/domain/signIn";
import { signIn as signInDriver } from "@/driver";

interface SignInGatewayInterface {
  signIn: (email: SignIn['email'], password: SignIn['password']) => Promise<void>
}

export default class SignInGateway implements SignInGatewayInterface {
  async signIn(email: SignIn['email'], password: SignIn['password']): Promise<void> {
    await signInDriver(email, password)
  }
}