import * as convert from "./conversion.js";
import { agendas } from "./agendas.js";
import { havens } from "./havens.js";
import { library } from "./library.js";
import { factions } from "./faction.js";
import { city } from "./city.js";
import { monster } from "./monster.js";
import { form } from "./form.js";
import {
  AttackType,
  CardSet,
  CityCardType,
  Clan,
  Discipline,
  LibraryCardType,
  Cardpool,
} from "./common.js";

type Card = Agenda | Haven | Faction | Library | City | Monster | Form;

export type Agenda = {
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: ["agenda"];
  stack: "agenda";
  cardpools: Cardpool[];
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
  cardpools: Cardpool[];
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
  cardpools: Cardpool[];
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
  cardpools: Cardpool[];
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

export type Monster = {
  stack: "monster";
  id: string;
  illustrator: string;
  image: string;
  name: string;
  bloodPotency: number;
  attributePhysical: number;
  attributeSocial: number;
  attributeMental: number;
  set: CardSet;
  text: string;
  blood?: number;
  agenda?: number;
  types: ["monster"];
}

export type Form = {
  stack: "form";
  id: string;
  illustrator: string;
  image: string;
  name: string;
  set: CardSet;
  text: string;
  types: ["form"];
  cardpools: Cardpool[];
}

export const allUnstructured = ([] as Card[]).concat(
  Object.entries(city).map(convert.toUnstructuredCity),
  Object.entries(agendas).map(convert.toUnstructuredAgenda),
  Object.entries(havens).map(convert.toUnstructuredHaven),
  Object.entries(library).map(convert.toUnstructuredLibrary),
  Object.entries(factions).map(convert.toUnstructuredFaction),
  Object.entries(monster).map(convert.toUnstructuredMonster),
  Object.entries(form).map(convert.toUnstructuredForm),
);

