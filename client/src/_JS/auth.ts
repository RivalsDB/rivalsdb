import createAuth0Client, { Auth0Client, User } from "@auth0/auth0-spa-js";

interface UserData {
  token: string;
  user: string;
  email: string;
}

type OnUserData = (userData: UserData) => void;

export class Auth {
  private onUserData: OnUserData | undefined;
  private constructor(private auth0: Auth0Client) {
    window.setInterval(async () => {
      const isAuthenticated = await this.auth0.isAuthenticated();
      if (!isAuthenticated) return;

      const userData = await this.fetchUserData();
      if (!userData) return;

      this.forwardUserData(userData);
    }, 60e3);
  }

  public static async create(): Promise<Auth> {
    const auth0 = await createAuth0Client({
      domain: "rivalsdb.eu.auth0.com",
      client_id: "jfoDbFRgDspBrj1h9NXY9RUgXIwfKHUQ",
      audience: "https://www.rivalsdb.app/api",
      cacheLocation: "localstorage",
    });

    const instance = new Auth(auth0);

    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
      return instance;
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("code") && searchParams.has("state")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }
    return instance;
  }

  public async signIn(): Promise<void> {
    await this.auth0.loginWithPopup();

    const userData = await this.fetchUserData();
    if (!userData) return;

    this.forwardUserData(userData);
    this.createUserInRivalsDB(userData);
  }

  public async signOut(): Promise<void> {
    await this.auth0.logout({ localOnly: true });
  }

  public setUserDataCallback(onUserData: OnUserData): this {
    this.onUserData = onUserData;
    return this;
  }

  public async fetchUserData(): Promise<null | UserData> {
    const [token, user] = await Promise.all([
      this.auth0.getTokenSilently(),
      this.auth0.getUser(),
    ]);

    const email = user?.email;
    if (typeof email !== "string") return null;

    const userId = user?.sub;
    if (typeof userId !== "string") return null;

    return { email, token, user: userId };
  }

  private forwardUserData(userData: UserData): void {
    if (!this.onUserData) return;
    this.onUserData(userData);
  }

  private async createUserInRivalsDB(userData: UserData): Promise<void> {
    await fetch("/api/v2/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userData.email }),
    });
  }
}
