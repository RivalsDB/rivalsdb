import "../styles.sass";

import { Elm } from "./app";
import { Auth } from "./auth";
import { fetchCards } from "./cardData";
import { Tracker } from "./tracker";
import { generateId } from "./idGenerator";

async function main() {
  const cards = await fetchCards();
  const app = Elm.Main.init({ flags: cards });

  app.ports.generateId.subscribe(async () => {
    const id = await generateId();
    app.ports.receivedId.send(id);
  });

  const tracker = new Tracker();
  app.ports.trackEvent.subscribe((ev) => tracker.trackEvent(ev.name, ev.extra));

  const auth = new Auth((userData) => app.ports.signInReceiver.send(userData));
  app.ports.initiateLogin.subscribe((email) => auth.signIn(email));
  app.ports.signOut.subscribe(() => auth.signOut());
}

main();
