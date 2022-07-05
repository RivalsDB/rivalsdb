import { baseUrl } from "../env.js";
import * as convert from "./conversion.js";
import { agendas } from "./agendas.js";
import { havens } from "./havens.js";
import { library } from "./library.js";
import { factions } from "./faction.js";
import { city } from "./city.js";

type Card = Agenda | Haven | Faction | Library | City;

type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds"
  | "Heart of Europe";

type Clan =
  | "brujah"
  | "gangrel"
  | "hecata"
  | "lasombra"
  | "malkavian"
  | "nosferatu"
  | "thin-blood"
  | "toreador"
  | "tremere"
  | "ventrue";

type Discipline =
  | "animalism"
  | "auspex"
  | "blood sorcery"
  | "celerity"
  | "dominate"
  | "fortitude"
  | "obfuscate"
  | "oblivion"
  | "potence"
  | "presence"
  | "protean"
  | "thin-blood alchemy";

type AttackType = "mental" | "physical" | "ranged" | "social";

type LibraryCardType =
  | "1 per player"
  | "2 actions"
  | "action"
  | "alchemy"
  | "animal"
  | "attack"
  | "conspiracy"
  | "event"
  | "influence modifier"
  | "trap"
  | "ongoing"
  | "reaction"
  | "ritual"
  | "unique"
  | "scheme"
  | "special"
  | "title"
  | "unhosted action";

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

export type Agenda = {
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: ["agenda"];
  stack: "agenda";
};

export type Haven = {
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: ["haven"];
  stack: "haven";
};

export type Faction = {
  attributeMental: number;
  attributePhysical: number;
  attributeSocial: number;
  bloodPotency: number;
  clan: Clan;
  disciplines: Discipline[];
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: ["character"];
  flavor?: string;
  stack: "faction";
};

export type Library = {
  attackType?: AttackType[];
  reactionType?: AttackType[];
  bloodPotency?: number;
  clan?: Clan;
  disciplines?: Discipline[];
  id: string;
  illustrator: string;
  image: string;
  name: string;
  damage?: number;
  shield?: number;
  set: CardSet;
  text: string;
  types: LibraryCardType[];
  flavor?: string;
  stack: "library";
};

export type City = {
  stack: "city";
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: CityCardType[];
  copies: number;
  blood?: number;
  agenda?: number;
  flavor?: string;
};

export const allUnstructured = ([] as Card[]).concat(
  Object.entries(city).map(convert.toUnstructuredCity),
  Object.entries(agendas).map(convert.toUnstructuredAgenda),
  Object.entries(havens).map(convert.toUnstructuredHaven),
  Object.entries(library).map(convert.toUnstructuredLibrary),
  Object.entries(factions).map(convert.toUnstructuredFaction)
);
