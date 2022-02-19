export const enum GameMode {
  headToHead,
  multiplayer,
  both,
}

export function fromString(str: string): GameMode {
  switch (str) {
    case "headToHead":
      return GameMode.headToHead;
    case "multiplayer":
      return GameMode.multiplayer;
    case "both":
      return GameMode.both;
    default:
      return GameMode.both;
  }
}

export function toString(
  gameMode: GameMode
): "both" | "headToHead" | "multiplayer" {
  switch (gameMode) {
    case GameMode.headToHead:
      return "headToHead";
    case GameMode.multiplayer:
      return "multiplayer";
    case GameMode.both:
      return "both";
  }
}
