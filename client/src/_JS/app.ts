// @ts-ignore
import mainElm from "../../.elm-spa/defaults/Main.elm";

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

    signOut: {
      subscribe: (callback: () => void) => void;
    };
  };
}

export const Elm: Elm = mainElm.Elm;
