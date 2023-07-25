import { CardSet, CardId, Illustrator, md } from "./common.js";

export type Monster = {
  stack: "monster";
  illustrator: Illustrator;
  name: string;
  bloodPotency: number;
  physical: number;
  social: number;
  mental: number;
  set: CardSet;
  text: string;
  blood?: number;
  agenda?: number;
};

export const monster: Record<CardId, Monster> = {

"hoe-brain-eater": {
    stack: "monster",
    name: "Brain-Eater",
    text: md`
At the end of your turn, put a Fear token on the lowest [blood-potency] character in your cell (if tied, choose one).
    `,
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    agenda: 3,
    },

"hoe-chupacabra": {
    stack: "monster",
    name: "Chupacabra",
    text: md`
The very first time you deal attack [damage] to this Monster, it steals 1 [blood] from the attacker.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 1,
    mental: 1,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    agenda: 2,
    },

"hoe-ghost": {
    stack: "monster",
    name: "Ghost",
    text: md`
+1 Secrecy while **Wounded.**

+2 [shield] against [ranged] and [physical] attacks.
    `,
    bloodPotency: 6,
    physical: 0,
    social: 1,
    mental: 2,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    agenda: 2,
    },

"hoe-maricoxi": {
    stack: "monster",
    name: "Maricoxi",
    text: md`
+1 Secrecy while **Wounded.**

Reactions cannot be played against this Monster's Preemptice Strikes.
    `,
    bloodPotency: 7,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    agenda: 2,
    },

"hoe-mula-sem-cabeca": {
    stack: "monster",
    name: "Mula-Sem-Cabeça",
    text: md`
This Monster's Preemptive Strike deals **Aggravated [damage].**
    `,
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    agenda: 2,
    },

"hoe-sorceress": {
    stack: "monster",
    name: "Sorceress",
    text: md`
When you deal attack [damage] to this Monster, discard 1 card.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    agenda: 3,
    },

"hoe-the-strange": {
    stack: "monster",
    name: "The Strange",
    text: md`
Play with your hand of cards revealed to all players.
    `,
    bloodPotency: 8,
    physical: 2,
    social: 2,
    mental: 0,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    agenda: 3,
    },

"hoe-vampire": {
    stack: "monster",
    name: "Vampire",
    text: md`
At the start of your turn, if there are 2+ City Deck Mortals in The Streets, this Monster mends 2 [blood].
    `,
    bloodPotency: 8,
    physical: 0,
    social: 3,
    mental: 1,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    agenda: 3,
    },

"hoe-warlock": {
    stack: "monster",
    name: "Warlock",
    text: md`
Attackers in a party of 3+ characters deal -1[damage] to this Monster.
    `,
    bloodPotency: 9,
    physical: 1,
    social: 1,
    mental: 3,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    agenda: 3,
    },

"hoe-werewolf": {
    stack: "monster",
    name: "Werewolf",
    text: md`
While **Wounded, this Monster Preemptive Strikes each member of the attacking party, one at a time and in the order your Adversary's choosing.
    `,
    bloodPotency: 10,
    physical: 3,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    agenda: 4,
    },

}