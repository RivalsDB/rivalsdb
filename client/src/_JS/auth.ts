import { Magic, RPCError, SDKError } from "magic-sdk";
import type { App } from "./app";

const magic = new Magic("pk_live_1FB57945CEA1A727");

export async function afterSignin(app: App, did: string): Promise<void> {
  const meta = await magic.user.getMetadata();

  if (did && meta) {
    app.ports.signInReceiver.send({ token: did, user: meta.issuer });
    window.setTimeout(async () => {
      const newDid = await magic.user.getIdToken();
      afterSignin(app, newDid);
    }, 14 * 60 * 1000);
  }
}

export async function signinWithQueryCredentials(
  app: App,
  queryString: string
): Promise<void> {
  try {
    const did = await magic.auth.loginWithCredential(queryString);
    await afterSignin(app, did);
  } catch (e) {
    // noop
  }
}

export async function trySignInFromCache(app: App): Promise<void> {
  let did: string;
  try {
    did = await magic.user.getIdToken();
  } catch (e) {
    if (e instanceof RPCError) {
      console.log("RPCError", e);
      return;
    }
    if (e instanceof SDKError) {
      console.log("SDKError", e);
      return;
    }
    throw e;
  }
  await afterSignin(app, did);
}

export async function preloadSigninModal(): Promise<void> {
  await magic.preload();
}

export async function signOut(): Promise<void> {
  await magic.user.logout();
}

export async function signIn(email: string): Promise<string> {
  const did = await magic.auth.loginWithMagicLink({
    email,
    redirectURI: window.location.origin,
  });
  return did;
}
