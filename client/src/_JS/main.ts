import "../styles.sass";

import { Elm } from "./app";
import { Auth } from "./auth";
import { fetchCards } from "./cardData";
import { Tracker } from "./tracker";

async function main() {
  const cards = await fetchCards();
  const app = Elm.Main.init({ flags: cards });

  const tracker = new Tracker();
  app.ports.trackEvent.subscribe((ev) => tracker.trackEvent(ev.name, ev.extra));

  const auth = new Auth((userData) => app.ports.signInReceiver.send(userData));
  app.ports.initiateLogin.subscribe((email) => auth.signIn(email));
  app.ports.signOut.subscribe(() => auth.signOut());
}

main();
