import { Magic } from "magic-sdk";
// @ts-ignore
import { Elm } from "../.elm-spa/defaults/Main.elm";
import "./styles.sass";

interface ElmApp {
  ports: {
    signInReceiver: {
      send: (props: { token: string; user: string }) => void;
    };
    initiateLogin: {
      subscribe: (callback: (email: string) => void) => void;
    };
    signOut: {
      subscribe: (callback: () => void) => void;
    };
  };
}

const magic = new Magic("pk_live_1FB57945CEA1A727");

async function afterSignin(app: ElmApp, did: string) {
  const meta = await magic.user.getMetadata();

  if (did && meta) {
    app.ports.signInReceiver.send({ token: did, user: meta.issuer });
  }
}

async function signInWithQueryCrendetials(app: ElmApp) {
  try {
    const did = await magic.auth.loginWithCredential();
    await afterSignin(app, did);
  } catch (e) {
    window.location.href = window.location.origin;
  }
}

async function trySignInFromCache(app: ElmApp) {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const did = await magic.user.getIdToken();
    await afterSignin(app, did);
  }
}

async function fetchCards() {
  const res = await fetch("/api/v1/cards");
  const cards = await res.json();
  return cards;
}

async function main() {
  const cards = await fetchCards();
  const app: ElmApp = Elm.Main.init({ flags: cards });

  magic.preload();

  app.ports.initiateLogin.subscribe(async (email: string) => {
    const did = await magic.auth.loginWithMagicLink({
      email,
      redirectURI: window.location.origin,
    });
    await afterSignin(app, did);
  });

  app.ports.signOut.subscribe(magic.user.logout);

  if (window.location.search) {
    signInWithQueryCrendetials(app);
  } else {
    trySignInFromCache(app);
  }
}

main();
