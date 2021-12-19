// @ts-ignore
import mainElm from "../../src/Main.elm";
import type { EventProps } from "./plausible";

interface Options {
  flags: any;
}

interface Elm {
  Main: {
    init: (opts: Options) => App;
  };
}

export interface App {
  ports: {
    signInReceiver: {
      send: (props: { token: string; user: string }) => void;
    };

    initiateLogin: {
      subscribe: (callback: (email: string) => void) => void;
    };

    trackEvent: {
      subscribe: (
        callback: (opts: { name: string; extra?: EventProps }) => void
      ) => void;
    };

    signOut: {
      subscribe: (callback: () => void) => void;
    };
  };
}

export const Elm: Elm = mainElm.Elm;
