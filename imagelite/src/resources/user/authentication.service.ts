import { jwtDecode } from "jwt-decode";
import { AccessToken, Credentials, User, UserSessionToken } from "./user.resource";

class AuthService {
  baseURL: string = "http://localhost:8080/v1/users";

  static AUTH_PARAM: string = "_auth";

  async authenticate(credentials: Credentials): Promise<AccessToken> {
    const response = await fetch(this.baseURL + "/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status == 401) {
      throw new Error("User or password are incorrect!")
    }

    return await response.json();
  }

  async register(user: User): Promise<void> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status == 409) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }
  }

  initSession(token: AccessToken) {
    if (token.accessToken) {
      const decodedToken: any = jwtDecode(token.accessToken);

      const userSessionToken: UserSessionToken = {
        accesToken: token.accessToken,
        name: decodedToken.name,
        email: decodedToken.sub,
        expiration: decodedToken.exp
      }

      this.setUserSession(userSessionToken);
    }
  }

  getUserSession(): UserSessionToken | null {
    if (typeof window !== "undefined") {
      let authString = localStorage.getItem(AuthService.AUTH_PARAM);

      if (!authString) {
        return null;
      }

      const token: UserSessionToken = JSON.parse(authString);
      return token;
    }
    return null;
  }

  setUserSession(userSessionToken: UserSessionToken) {
    localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
  }

  isSessionValid(): boolean {
    const userSession: UserSessionToken | null = this.getUserSession();
    if (!userSession) return false;

    const expiration: number | undefined = userSession.expiration;
    if (expiration) {
      const expirationDateInMillis = expiration * 1000;
      const expirationDate = new Date(expirationDateInMillis);

      return new Date() < expirationDate;
    }
    return false;
  }

  invalidateSession(): void {
    localStorage.removeItem(AuthService.AUTH_PARAM);
  }
}

export const useAuth = () => new AuthService();
