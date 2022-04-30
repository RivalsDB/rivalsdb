import { generateId } from "@rivalsdb/id";

import "../styles.sass";

import { Elm } from "./app";
import { Auth } from "./auth";
import { fetchCards } from "./cardData";
import { Tracker } from "./tracker";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

async function main() {
  const [cards, auth] = await Promise.all([fetchCards(), Auth.create()]);
  const strictFilterInitial = getRandomInt(2) === 0 ? false : true;

  const app = Elm.Main.init({ flags: { cards, strictFilterInitial } });

  app.ports.generateId.subscribe(async () =>
    generateId().then(app.ports.receivedId.send)
  );

  app.ports.initiateLogin.subscribe(() => auth.signIn());
  app.ports.signOut.subscribe(() => auth.signOut());
  auth.setUserDataCallback(app.ports.signInReceiver.send);

  const userData = await auth.fetchUserData().catch(() => null);
  if (userData) app.ports.signInReceiver.send(userData);

  const tracker = new Tracker();
  app.ports.trackEvent.subscribe((ev) => tracker.trackEvent(ev.name, ev.extra));
}

main();
