import { baseUrl } from "../env.js";
import { Agenda, Haven, Faction, Library } from "./structuredCards.js";
import {
  Agenda as UnAgenda,
  Haven as UnHaven,
  Faction as UnFaction,
  Library as UnLibrary,
} from "./cards.js";

const imageSrc = (id: string) => `${baseUrl}/card/${id}.webp`;

type Pair<T> = [string, T];

export const toUnstructuredAgenda = ([id, c]: Pair<Agenda>): UnAgenda => ({
  stack: "agenda",
  types: ["agenda"],
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
});

export const toUnstructuredHaven = ([id, c]: Pair<Haven>): UnHaven => ({
  stack: "haven",
  types: ["haven"],
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
});

export const toUnstructuredFaction = ([id, c]: Pair<Faction>): UnFaction => ({
  stack: "faction",
  types: ["character"],
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
  attributeMental: c.mental,
  attributePhysical: c.physical,
  attributeSocial: c.social,
  bloodPotency: c.bloodPotency,
  clan: c.clan,
  disciplines: c.disciplines ?? [],
});

export const toUnstructuredLibrary = ([id, c]: Pair<Library>): UnLibrary => ({
  stack: "library",
  types: c.types,
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
  bloodPotency: c.bloodPotencyRequirement,
  clan: c.clan,
  disciplines: c.disciplines,
  attackType: c.attack ? [c.attack] : undefined,
  reactionType: c.reactions,
  damage: c.damage,
  shield: c.shield,
});
