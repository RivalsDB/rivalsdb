export const enum GAME_MODE {
  headToHead = "headToHead",
  multiplayer = "multiplayer",
  both = "both",
}

export function gameModeFromString(str: string): GAME_MODE {
  switch (str) {
    case "headToHead":
      return GAME_MODE.headToHead;
    case "multiplayer":
      return GAME_MODE.multiplayer;
    case "both":
      return GAME_MODE.both;
    default:
      return GAME_MODE.both;
  }
}
