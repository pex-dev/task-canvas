import { SignUp } from "@/domain/signUp";
import { signUp as signUpDriver } from "@/driver";

interface SignUpGatewayInterface {
  signUp: (email: SignUp['email'], password: SignUp['password']) => Promise<void>
}

export default class SignUpGateway implements SignUpGatewayInterface {
  async signUp(email: SignUp['email'], password: SignUp['password']): Promise<void> {
    await signUpDriver(email, password)
  }
}