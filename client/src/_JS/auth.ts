import { Magic, MagicUserMetadata } from "magic-sdk";

const API_KEY = "pk_live_1FB57945CEA1A727";

interface UserData {
  token: string;
  user: string;
  email: string;
}

export class Auth {
  private magic;
  private storageKey = "authdata";
  constructor(private onUserData: (userData: UserData) => void) {
    this.magic = new Magic(API_KEY);
    this.magic.preload();

    this.watchStorageForUserData();

    const credential = this.readCredential();
    if (credential) {
      this.tryLoginWithCredential(credential);
      return this;
    }

    const loggedInFromCache = this.tryLoginFromStorage();
    if (loggedInFromCache) {
      return this;
    }

    this.tryLoginFromMagic();
  }

  public async signOut(): Promise<void> {
    await this.magic.user.logout();
  }

  public async signIn(email: string): Promise<void> {
    const redirectURI = window.location.origin;
    const token = await this.magic.auth.loginWithMagicLink({
      email,
      redirectURI,
    });
    if (!token) return;

    const metadata = await this.magic.user.getMetadata();

    const userData = this.makeUserData(token, metadata);
    this.onUserData(userData);

    const refreshAt = this.cacheUserData(userData);
    this.scheduleUserDataRefresh(refreshAt);
  }

  private watchStorageForUserData() {
    window.addEventListener("storage", (ev) => {
      if (ev.key === this.storageKey && ev.newValue !== null) {
        const userdata = this.parseDated(ev.newValue);
        if (userdata) {
          this.onUserData(userdata);
        }
      }
    });
  }

  private makeUserData(token: string, metadata: MagicUserMetadata): UserData {
    const { issuer: user, email } = metadata;
    if (!user || !email) {
      throw Error("Bad auth metadata");
    }

    return { token, user, email };
  }

  private readCredential(): string | null {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("magic_credential");
  }

  private async tryLoginWithCredential(credential: string): Promise<boolean> {
    const token = await this.magic.auth.loginWithCredential(credential);
    if (!token) return false;

    const metadata = await this.magic.user.getMetadata();
    if (!metadata.issuer || !metadata.email) return false;

    const userData = { token, user: metadata.issuer, email: metadata.email };
    this.onUserData(userData);

    const refreshAt = this.cacheUserData(userData);
    this.scheduleUserDataRefresh(refreshAt);

    return true;
  }

  private tryLoginFromStorage(): boolean {
    const cachedUserData = this.readCachedUserData();
    if (!cachedUserData) return false;
    this.onUserData(cachedUserData);
    return true;
  }

  private async tryLoginFromMagic(): Promise<boolean> {
    const isLoggedIn = await this.magic.user.isLoggedIn();
    if (!isLoggedIn) return false;

    const [token, metadata] = await Promise.all([
      this.magic.user.getIdToken(),
      this.magic.user.getMetadata(),
    ]);
    if (!metadata.issuer || !metadata.email) return false;

    const userData = { token, user: metadata.issuer, email: metadata.email };
    this.onUserData(userData);

    const refreshAt = this.cacheUserData(userData);
    this.scheduleUserDataRefresh(refreshAt);

    return true;
  }

  private cacheUserData(userdata: UserData): number {
    const expirestAt = Date.now() + 14 * 60 * 1000;
    const dated = { ...userdata, expirestAt };
    localStorage.setItem(this.storageKey, JSON.stringify(dated));
    return expirestAt;
  }

  private scheduleUserDataRefresh(refreshAt: number): void {
    const timeout = refreshAt - Date.now();
    if (timeout > 0) {
      window.setTimeout(() => this.tryLoginFromMagic(), timeout);
    } else {
      this.tryLoginFromMagic();
    }
  }

  private readCachedUserData(): UserData | null {
    const json = localStorage.getItem(this.storageKey);
    if (!json) return null;

    const userData = this.parseDated(json);
    if (userData === null) {
      localStorage.removeItem(this.storageKey);
    }

    return userData;
  }

  private parseDated(json: string): UserData | null {
    const obj = JSON.parse(json);
    const { token, user, email, expirestAt } = obj;

    if (typeof expirestAt !== "number" || expirestAt < Date.now()) {
      return null;
    }

    if (
      typeof token !== "string" ||
      typeof user !== "string" ||
      typeof email === "string"
    ) {
      return null;
    }

    return { token, user, email };
  }
}
