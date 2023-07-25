import { CityCardType, CardSet, CardId, Illustrator, md } from "./common.js";

export type City = {
  stack: "city";
  illustrator: Illustrator;
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
  "c22-call-the-roll": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "János Orbán",
    name: "Call the Roll",
    types: ["event", "ongoing"],
    text: md`
Ongoing - Characters in The Streets have +1 Influence.
    `,
    copies: 1,
  },
  "c22-city-wide-lockdown": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Darko Stojanovic",
    name: "City-Wide Lockdown",
    types: ["event", "ongoing"],
    text: md`
Move all characters to their Havens.

Ongoing - Your characters cannot move to The Streets during your turn except by,

**Exert X Influence:** Move X characters in your coterie to The Streets.

This influence can only come from characters.
    `,
    copies: 1,
  },
  "c22-crack-shot": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Darko Stojanovic",
    name: "Crack Shot",
    types: ["event", "ongoing"],
    text: md`
Ongoing - _Vagrants_ cannot prevent Antagonist damage.
    `,
    copies: 1,
  },
  "c22-enter-elysium": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "János Orbán",
    name: "Enter Elysium",
    types: ["event", "ongoing"],
    text: md`
Ongoing - All characters have +1 Secrecy.
    `,
    copies: 1,
  },
  "c22-new-blood": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Darko Stojanovic",
    name: "New Blood",
    types: ["event", "ongoing"],
    text: md`
Ongoing - The first time you recruit a character during your turn, gain 2 [prestige].
    `,
    copies: 1,
  },
  "c22-offer-of-help": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Darko Stojanovic",
    name: "Offer of Help",
    types: ["event"],
    text: md`
Each player may put 1 [blood] or [prestige] from their general supply onto a card they control.
    `,
    copies: 1,
  },
  "c22-opening-ceremonies": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Anastasiia Horbunova",
    name: "Opening Ceremonies",
    types: ["event", "ongoing"],
    text: md`
Ongoing - **Exhaust up to 3 characters in your coterie:** For each you do, gain 1 [prestige].
    `,
    copies: 1,
  },
  "c22-purge-the-old-guard": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Darko Stojanovic",
    name: "Purge the Old Guard",
    types: ["event"],
    text: md`
Put 1 [agenda] on the character(s) with the highest [blood-potency] among the coteries.
    `,
    copies: 1,
  },
  "c22-show-of-force": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "János Orbán",
    name: "Show of Force",
    types: ["event", "ongoing"],
    text: md`
_Place no player token on this when revealed._

Ongoing - The next time an Antagonist is defeated, burn them, then burn this card.
    `,
    copies: 1,
  },
  "c22-to-absent-friends": {
    stack: "city",
    set: "Conclave 22",
    illustrator: "Anastasiia Horbunova",
    name: "To Absent Friends",
    types: ["event", "ongoing"],
    text: md`
Ongoing - Each character in your coterie has

**Pay 1 [blood]:** Put that [blood] on target character in torpor.
    `,
    copies: 1,
  },
  "core-prince-of-the-city": {
    stack: "city",
    set: "Core",
    illustrator: "The Creation Studio",
    name: "Prince of the City",
    text: "This character's Secrecy is always 0.\nThis character has +2 Influence.\nAt the start of your turn, gain 1 [prestige] and 1 [agenda].",
    types: ["title"],
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
  "hoe-a-house-divided": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Irene Francisco",
    name: "A House Divided",
    types: ["event", "ongoing"],
    text: md`
Ongoing - Each character in their Haven is a separate party.
    `,
    flavor: md`
Sometimes the walls one puts up are constructured entirely of one's own hubris.
    `,
    copies: 1,
  },
  "hoe-austerity-measures": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Adelijah Ocampo",
    name: "Austerity Measures",
    types: ["event"],
    text: md`
Each player who controls 2+ attachments burns 1 of them. _(Titles, attached vampires, and Curses cannot be burned this way.)_
    `,
    copies: 1,
  },
  "hoe-bohemian-carnevale": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Adelijah Ocampo",
    name: "Bohemian Carnevale",
    types: ["event"],
    text: md`
In clockwise order, each player may

**Pay 1 [blood] from 1 character in their coterie:** Choose 1 card in the City Deck burned pile and shuffle it into the City Deck.
    `,
    copies: 1,
  },
  "hoe-liberate": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Joshua Esmeralda",
    name: "Liberate",
    types: ["event", "ongoing"],
    text: md`
Ongoing - When your attacker defeats a character, you may attach 1 of the defeated character's Retainers to the attacker.
    `,
    copies: 1,
  },
  "hoe-midnight-curfew": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Adelijah Ocampo",
    name: "Midnight Curfew",
    types: ["event"],
    text: md`
Discard all unattached Citizens in The Streets, then shuffle the City Deck discard pile into the City Deck.
    `,
    flavor: md`
Supposedly to curb drunken behavior, but to the Kindred it means a short window for dinner.
    `,
    copies: 1,
  },
  "hoe-racing-the-clock": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Mara Miranda-Escota",
    name: "Racing the Clock",
    types: ["event", "ongoing"],
    text: md`
Ongoing - At the start of your turn, you may exhaust the highest [blood-potency] character in your coterie who is ready and put a Fear token on them. If you don't, lose 1 Action this turn.
    `,
    copies: 1,
  },
  "hoe-sword-of-god": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Irene Francisco",
    name: "Sword of God",
    types: ["event", "ongoing"],
    text: md`
Ongoing - All characters have 0 Secrecy.

The first time you defeat a Team X Operative during your turn, gain 1 [prestige].
    `,
    copies: 1,
  },
  "hoe-temporary-truce": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Harvey Bunda",
    name: "Temporary Truce",
    types: ["event", "ongoing"],
    text: md`
Ongoing - Leaders may not perform Attack actions.
    `,
    flavor: md`
Everyone is watching the clan Leaders, leaving their underlings free to make name for themselves.
    `,
    copies: 1,
  },
  "hoe-tipped-off": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Irene Francisco",
    name: "Tipped Off",
    types: ["event", "ongoing"],
    text: md`
_Place no player token on this when revealed._

Ongoing, **Action:** Influence Conflict (Scheme) - Should I move 1 Second Inquisition from The Streets to next to the Haven of target player (choose now), then burn this card?
    `,
    copies: 1,
  },
  "hoe-walpurgis-night": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Joshua Esmeralda",
    name: "Walpurgis Night",
    types: ["event", "ongoing"],
    text: md`
Ongoing - During your turn, you may

**Pay 1 [blood] from 1 character in your coterie:**

Put a Fear token on target character.
    `,
    copies: 1,
  },
  "hoe-bartender": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Harvey Bunda",
    name: "Bartender",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Gain [fortitude] and +1 [blood-potency].
    `,
    copies: 1,
  },
  "hoe-butcher": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Adelijah Ocampo",
    name: "Butcher",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Gain [animalism] and +1 [blood-potency].
    `,
    copies: 1,
  },
  "hoe-graffiti-artist": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Harvey Bunda",
    name: "Graffiti Artist",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - +1 Secrecy.
    `,
    copies: 1,
  },
  "hoe-medium": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Harvey Bunda",
    name: "Medium",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Draw 1 card. Gain [oblivion].
    `,
    copies: 1,
  },
  "hoe-nun": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Harvey Bunda",
    name: "Nun",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - +1 [shield] during attacks.
    `,
    copies: 1,
  },
  "hoe-streetwalker": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Mara Miranda-Escota",
    name: "Streetwalker",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Draw 1 card. Gain [obfuscate].
    `,
    copies: 1,
  },
  "hoe-taxi-driver": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Mara Miranda-Escota",
    name: "Taxi Driver",
    types: ["citizen", "mortal", "retainer"],
    blood: 3,
    agenda: 1,
    text: md`
When defeated, gain 1 [agenda] and choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - +1 Intel.
    `,
    copies: 1,
  },
  "hoe-vagrant": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Joshua Esmeralda",
    name: "Vagrant",
    types: ["mortal", "retainer"],
    blood: 2,
    agenda: 0,
    text: md`
When defeated, choose one:

Burn - Mend 2 [blood].

Attach - **Exhaust _Vagrant_:** Prevent 1 [damage] to this character.
    `,
    copies: 5,
  },
  "hoe-team-x-operative": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Irene Francisco",
    name: "Team X Operative",
    types: ["mortal", "antagonist", "ongoing", "second inquisition"],
    blood: 4,
    agenda: 1,
    text: md`
In each location, stack all Team X Operatives.

Resolve only the top card. Ongoing -

1st and 3rd Operative - Deal 1 **Aggravated [damage]** to a character in your coterie.

2nd Operative - Also discard 1 card.

4th Operative - Also lose 1 [prestige].
    `,
    copies: 4,
  },
  "hoe-prince-of-the-city": {
    stack: "city",
    set: "Heart of Europe",
    illustrator: "Mara Miranda-Escota",
    name: "Prince of the City",
    types: ["title"],
    text: md`
When you attach this Title, gains 2 [agenda].

This character's Secrecy is always 0.

This character has +4 Influence.
    `,
    copies: 1,
  },

  "hah-politician": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Politician",
    types: ["mortal", "retainer"],
    text: md`
When defeated choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - +2 Influence.
    `,
    copies: 1,
  },

  "hah-practitioner of the dark arts": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Darko Stojanovic",
    name: "Practitioner of the Dark Arts",
    types: ["mortal", "retainer"],
    text: md`
When defeated choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Draw 1 card. Gain [oblivion].
    `,
    copies: 1,
  },

  "hah-prince of the city": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Prince of the City",
    types: ["title"],
    text: md`
When you attach this Title, gain 1 [agenda].

This character has +2 Influence.

At the end of each player's turn, if this card is in The Streets, the active player deals 1 **Aggravated [damage] to a character in their coterie (unless they control this card).
    `,
    copies: 1,
  },

  "hah-seeking-followers": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Politician",
    types: ["event", "ongoing"],
    text: md`
Ongoing - At the end of your turn, lose 1 [prestige] unless you control 1+ Retainers.
    `,
    copies: 1,
  },

  "hah-snake-handler": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Joyce Maureira",
    name: "Snake Handler",
    types: ["mortal", "retainer"],
    text: md`
When defeated choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Gain [protean] and +1 [blood-potency]
    `,
    copies: 1,
  },

  "hah-uprising": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Uprising",
    types: ["event", "ongoing"],
    text: md`
Ongoing - After the first attack of your turn, if the target was a character with 5+ [blood-potency] and you did not defeat them, gain 1 Action.
    `,
    copies: 1,
  },

  "hah-vagrant": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Vagrant",
    types: ["mortal", "retainer"],
    text: md`
When defeated choose one:

Burn - Mend 2 [blood].

Attach - *Exhaust Vagrant:* Prevent 1 [damage] to this character.
    `,
    copies: 5,
  },

  "hah-blood-cult-priest": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Felipe Gaona",
    name: "Blood Cult Priest",
    types: ["mortal", "retainer"],
    text: md`
When defeated choose one:

Burn - Mend 3 [blood] or gain 1 [prestige].

Attach - Draw 1 card. Gain [blood-potency].
    `,
    copies: 1,
  },

  "hah-bope-rj-caveira": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Felipe Gaona",
    name: "BOPE-RJ: Caveira",
    types: ["mortal", "antagonist", "ongoing"],
    text: md`
Ongoing - During your Antagonist Step, if you control no characters in The Streets, move 1 character in your Haven to The Streets.
    `,
    copies: 1,
  },

  "hah-bope-rj-marksman": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Felipe Gaona",
    name: "BOPE-RJ: Marksman",
    types: ["mortal", "antagonist", "ongoing"],
    text: md`
Ongoing - When you move a party of your characters to The Streets duing you turn, deal 1 **Aggravated** [damage] to a vampire in that party.
    `,
    copies: 2,
  },

  "hah-bope-rj-psyops": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Felipe Gaona",
    name: "BOPE-RJ: Psyops",
    types: ["mortal", "antagonist", "ongoing"],
    text: md`
Ongoing - When you move a party of your characters to The Streets during your turn, discard 1 card.
    `,
    copies: 1,
  },

  "hah-carnival": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Carnival",
    types: ["event"],
    text: md`
Shuffle all Events in the burned pile inot the City Deck, then add 1 card per player to The Streets.
    `,
    copies: 1,
  },

  "hah-copacabana-reveillon": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Copacabana Réveillon",
    types: ["event", "ongoing"],
    text: md`
Ongoing - All characters have -1 Secrecy.
    `,
    copies: 1,
  },

  "hah-corruption": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Corruption",
    types: ["event", "ongoing"],
    text: md`
_Place no player token on this when revealed. When it gains a token, it will be removed at the start of a player's turn if there is Prestige of their color on it._

Ongoing - When you gain 1+ [prestige], place 1 of those tokens on this card.
    `,
    copies: 1,
  },

  "hah-crackdown": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Crackdown",
    types: ["event", "ongoing"],
    text: md`
Ongoing - At the end of your Beginning Phase, flip your active Haven face down, then flip it face up at the start of your next turn.
    `,
    copies: 1,
  },

  "hah-cristo-redentor": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Cristo Redentor",
    types: ["event", "ongoing"],
    text: md`
Ongoing - To perform an Attack Action, the acting player must pat 1 [prestige].
    `,
    copies: 1,
  },

  "hah-dia-da-independencia": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Dia da Independência",
    types: ["event", "ongoing"],
    text: md`
Ongoing - When a character is defeated, return 1 of their Retainers at random to The Streets.
    `,
    copies: 1,
  },

  "hah-lookout": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Lookout",
    types: ["mortal", "retainer"],
    text: md`
    When defeated choose one:

    Burn - Mend 3 [blood] or gain 1 [prestige].
    
    Attach - Party - Ignore 1 Antagonist when this party moves to The Streets.
    `,
    copies: 1,
  },

  "hah-maid": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Maid",
    types: ["mortal", "retainer"],
    text: md`
    When defeated choose one:

    Burn - Mend 3 [blood] or gain 1 [prestige].
    
    Attach - Party - At the end of your turn, you may move this character into any party within your coterie (ignoring Antagonists).
    `,
    copies: 1,
  },
  
  "hah-meeting-at-pao-de-acucar": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Meeting at Pão de Açúcar",
    types: ["event", "ongoing"],
    text: md`
_Place no player token on this when revealed._

Ongoing, **Action:** Scheme Influence Conflict - Should target player (chose now) lose 2 [agenda] and gain 2 [prestige], then burn this card? Only Leaders may exert Influence (no Influence Modifiers or [prestige])
    `,
    copies: 1,    
  },

  "hah-mugger": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Felipe Gaona",
    name: "Mugger",
    types: ["mortal", "retainer"],
    text: md`
    When defeated choose one:

    Burn - Mend 3 [blood] or gain 1 [prestige].
    
    Attach - Gain [potence] and +1 [blood-potency]
    `,
    copies: 1,
  },

  "hah-open-season": {
    stack: "city",
    set: "Hunters & Hunted",
    illustrator: "Cold Castle Studios",
    name: "Open Season",
    types: ["event", "ongoing"],
    text: md`
Flip the top card of the unused Monster stack face up.

Ongoing - During your Antagonist Step, this Monster attacks the lowest [blood-potency] character in your coterie.

**Round 1 Exception:** Place a new City Deck card, then shuffle this card back into the City Deck.
    `,
    copies: 1,    
  },
};
