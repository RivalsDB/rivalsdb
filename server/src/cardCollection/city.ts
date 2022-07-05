import { CardSet, CardId } from "./common.js";

type CityCardType =
  | "title"
  | "san francisco"
  | "event"
  | "ongoing"
  | "mortal"
  | "antagonist"
  | "retainer"
  | "citizen"
  | "second inquisition";

export type City = {
  stack: "city";
  illustrator: string;
  name: string;
  set: CardSet;
  text: string;
  types: CityCardType[];
  copies: number;
  blood?: number;
  agenda?: number;
  flavor?: string;
};

export const city: Record<CardId, City> = {
  "core-prince-of-the-city": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Prince of the City",
    text: "This character's Secrecy is always 0.\nThis character has +2 Influence.\nAt the start of your turn, gain 1 [prestige] and 1 [agenda].",
    types: ["title", "san francisco"],
    copies: 1,
  },
  "core-meeting-at-alcatraz": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Meeting at Alcatraz",
    text: "Each player must move their Leader to The Streets (unless in torport). They become a separate party. The active player's Leader doesn't return to their Haven this turn, but other characters may join their party.",
    types: ["event"],
    copies: 1,
  },
  "core-chinese-new-year": {
    stack: "city",
    set: "Core",
    illustrator: "Darko Stojanovic",
    name: "Chinese New Year",
    text: "Shuffle all Events in the burned pile into the CIty Deck.",
    types: ["event"],
    copies: 1,
  },
  "core-castro-street-party": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Castro Street Party",
    text: "Ongoing - Characters in The Streets have +1 Secrecy.",
    flavor: "You won't stand out in this crowd.",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-gallery-openning": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Gallery Opening",
    text: "Each player may discard up to 2 cards. For each discard, they gain 1 [prestige].",
    flavor:
      "I've got to get one of those pieces. She's starting to gain a following.",
    types: ["event"],
    copies: 1,
  },
  "core-city-on-the-brink": {
    stack: "city",
    set: "Core",
    illustrator: "Darko Stojanovic",
    name: "City on the Brink",
    text: "Ongoing - When you defeat a foe's character, gain 1 [agenda].",
    flavor: "You want a piece of me?",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-the-hunger": {
    stack: "city",
    set: "Core",
    illustrator: "Darko Stojanovic",
    name: "The Hunger",
    text: "Ongoing - Vagrants in The Streets award 1 [agenda] when defeated.\nAt the end of your turn, lose 1 [prestige] for each character in your coterie who is not at maximum [blood].",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-wandering-the-bart-tunnels": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Wandering the BART Tunnels",
    text: "Ongoing - Every character not in their Haven is a separate party.",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-cable-car-accident": {
    stack: "city",
    set: "Core",
    illustrator: "Darko Stojanovic",
    name: "Cable Car Accident",
    text: "Ongoing - Characters in The Streets do not return to their Haven at the start of their turn.",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-san-francisco-fog": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "San Francisco Fog",
    text: "Ongoing - [ranged] cards cannot be played.",
    flavor: "So thick that you could take a bite out of it.",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-protests-in-the-streets": {
    stack: "city",
    set: "Core",
    illustrator: "Marco Primo",
    name: "Protests in the Streets",
    text: "Ongoing - When a character attacks a Mortal in The Streets, that attacker loses 1 [blood].",
    types: ["event", "ongoing"],
    copies: 1,
  },
  "core-special-affairs-division": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Special Affairs Division",
    text: "When defeated, gain 1 [agenda] and discard this.\nOngoing - At the end of your turn, deal 1 Aggravated [damage] to a character in your coterie not protected by Secrecy.\n+1 Intel; stacks with other S.A.D.",
    blood: 4,
    agenda: 1,
    types: ["second inquisition", "mortal", "antagonist", "ongoing"],
    copies: 1,
  },
  "core-vagrant": {
    stack: "city",
    set: "Core",
    illustrator: "Amy Wilkins",
    name: "Vagrant",
    text: "When defeated, choose one:\nBurn - Mend 2 [blood].\nAttach - Exhaust Vagrant: Prevent 1 [damage] to this character.",
    blood: 2,
    agenda: 0,
    types: ["mortal", "retainer"],
    copies: 5,
  },
  "core-addict": {
    stack: "city",
    set: "Core",
    illustrator: "Marco Primo",
    name: "Addict",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Draw 1 card. Gain [auspex].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-chef": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Chef",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Draw 1 card. Gain [presence].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-student": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Student",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Gain +1 [mental].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-tour-guide": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Tour Guide",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Gain +1 [social].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-athlete": {
    stack: "city",
    set: "Core",
    illustrator: "Marco Primo",
    name: "Athlete",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Gain +1 [physical].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-cop": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Cop",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Gain [dominate] and +1 [blood-potency].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
  "core-skateboarder": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Skateboarder",
    text: "When defeated, gain 1 [agenda] and choose one:\nBurn - Mend 3 [blood].\nAttach - Gain [celerity] and +1 [blood-potency].",
    blood: 3,
    agenda: 1,
    types: ["citizen", "mortal", "retainer"],
    copies: 1,
  },
};
