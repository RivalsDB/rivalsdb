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
    //------
    // Auth
    //------
    signInReceiver: Js2Elm<{ token: string; user: string }>;
    initiateLogin: Elm2Js<string>;
    trackEvent: Elm2Js<{
      name: string;
      extra?: { [propName: string]: string };
    }>;
    signOut: Elm2Js<undefined>;
    //------
    // ID Gen
    //------
    generateId: Elm2Js<undefined>;
    receivedId: Js2Elm<string>;
  };
}

export const Elm: Elm = mainElm.Elm;
