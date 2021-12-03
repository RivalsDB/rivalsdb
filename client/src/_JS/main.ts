import { Elm } from "./app";
import {
  afterSignin,
  preloadSigninModal,
  signIn,
  signInWithQueryCrendetials,
  signOut,
  trySignInFromCache,
} from "./auth";
import { fetchCards } from "./cardData";
import "../styles.sass";

async function main() {
  const cards = await fetchCards();
  const app = Elm.Main.init({ flags: cards });

  app.ports.initiateLogin.subscribe(async (email: string) => {
    const did = await signIn(email);
    await afterSignin(app, did);
  });

  app.ports.signOut.subscribe(() => signOut());

  if (window.location.search) {
    signInWithQueryCrendetials(app);
  } else {
    trySignInFromCache(app);
  }

  preloadSigninModal();
}

main();
