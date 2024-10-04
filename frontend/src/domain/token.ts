import { getCookie, setCookie } from "cookies-next";

interface TokenInterface {
  setToken: (token: string) => void;
  getToken: () => string | null;
}

class Token implements TokenInterface {
  private static instance: Token;
  private token: string | null;

  private constructor() {
    this.token = null;
  }

  public static getInstance(): Token {
    if (!Token.instance) {
      Token.instance = new Token();
    }
    return Token.instance;
  }

  public setToken(token: string): void {
    this.token = token;
    setCookie('token', token)
  }

  public getToken(): string | null {
    const cookie = getCookie('token')

    return cookie ? cookie.toString() : null;
  }
}

export default Token;