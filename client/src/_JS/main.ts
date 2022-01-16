import Plausible from "plausible-tracker";
import { Elm } from "./app";
import {
  afterSignin,
  preloadSigninModal,
  signIn,
  signinWithQueryCredentials,
  signOut,
  trySignInFromCache,
} from "./auth";
import { fetchCards } from "./cardData";
import "../styles.sass";

async function main() {
  const plausible = Plausible({ domain: "rivalsdb.app" });
  plausible.enableAutoPageviews();
  plausible.enableAutoOutboundTracking();

  preloadSigninModal();

  const cards = await fetchCards();
  const app = Elm.Main.init({ flags: cards });

  app.ports.initiateLogin.subscribe(async (email: string) => {
    const did = await signIn(email);
    await afterSignin(app, did);
  });

  app.ports.trackEvent.subscribe((event) =>
    plausible.trackEvent(event.name, { props: event.extra })
  );

  app.ports.signOut.subscribe(() => signOut());

  if (window.location.search) {
    signinWithQueryCredentials(app, window.location.search);
  } else {
    trySignInFromCache(app);
  }
}

main();
