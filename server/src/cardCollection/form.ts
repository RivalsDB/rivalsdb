import { CardSet, CardId, Cardpool, Illustrator, md } from "./common.js";

export type Form = {
  stack: "form";
  illustrator: Illustrator;
  name: string;
  set: CardSet;
  text: string;
  cardpools: Cardpool[];
};

export const form: Record<CardId, Form> = {

// Fang and Talon //

"fat-crinos": {
  stack: "form",
  name: "Crinos",
  text: md`
    A werewolf may **Pay 2 Rage:**
    Attach this card and they have +2 [blood-potency] and mend 2 [blood].
    At the start of your Action Phase, if this character has less than 3 Rage, detach this Form.
    This character has +2 [physical], -1 [social], -1 [mental].
    Attacker - **Pay 2 Rage:** Ready this character and put a Fear token on the defender.
  `,
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"]
},

"fat-glabro": {
  stack: "form",
  name: "Glabro",
  text: md`
    A werewolf may **Pay 1 Rage:**
    Attach this card and have +1 [blood-potency] and mend 1 [blood].
    This character has +1 [physical].
    **Pay 1 Rage:** This character mends 1 [blood].
  `,
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"]
},

"fat-hispo": {
  stack: "form",
  name: "Hispo",
  text: md`
    A werewolf may **Pay 1 Rage:**
    Attach this card and they mend 1 [blood].
    This character has +1 [physical] and -1 [social].
    **Pay 1 Rage:** This character mends 1 [blood].
    Attacker - **Pay 1 Rage:** +1 **Aggravated** [damage]. Use only if you did not play an Attack card.
  `,
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"]
},

"fat-lupus": {
  stack: "form",
  name: "Glabro",
  text: md`
    A werewolf may **Pay 1 Rage:** Attach this card.
    This character has -1 [social], -1 [mental], +1 Stealth, **Reach**, and **Prowl** _(may attack City Deck Mortals in The Streets from their Caern)_.
    This character cannot play Rites or attach Gifts. Attached Gifts are blank.
  `,
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"]
},

};
