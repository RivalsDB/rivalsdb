// @ts-ignore
import mainElm from "../../src/Main.elm";

interface Options {
  flags: any;
}

interface Elm {
  Main: {
    init: (opts: Options) => App;
  };
}

interface Elm2Js<Argument> {
  subscribe: (callback: (arg: Argument) => void) => void;
}
interface Js2Elm<Argument> {
  send: (arg: Argument) => void;
}

export interface App {
  ports: {
    signInReceiver: Js2Elm<{ token: string; user: string }>;

    initiateLogin: Elm2Js<string>;
    trackEvent: Elm2Js<{
      name: string;
      extra?: { [propName: string]: string };
    }>;
    signOut: Elm2Js<undefined>;
  };
}

export const Elm: Elm = mainElm.Elm;
