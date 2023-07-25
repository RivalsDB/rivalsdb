import { baseUrl } from "../env.js";
import type { Agenda } from "./agendas.js";
import type { Haven } from "./havens.js";
import type { Library } from "./library.js";
import type { Faction } from "./faction.js";
import type { City } from "./city.js";
import type { Monster } from "./monster.js";
import type {
  Agenda as UnAgenda,
  Haven as UnHaven,
  Faction as UnFaction,
  Library as UnLibrary,
  City as UnCity,
  Monster as UnMonster,
} from "./cards.js";

const imageSrc = (id: string) =>
  new URL(`/card/${id}.webp`, baseUrl).toString();

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
  disciplines: Object.entries(c.disciplines).flatMap(([discipline, level]) =>
    Array(level).fill(discipline)
  ),
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
  attackType: Array.isArray(c.attack)
    ? c.attack
    : c.attack
    ? [c.attack]
    : undefined,
  reactionType: Array.isArray(c.reactions)
    ? c.reactions
    : c.reactions
      ? [c.reactions]
      : undefined,
  damage: c.damage,
  shield: c.shield,
});

export const toUnstructuredCity = ([id, c]: Pair<City>): UnCity => ({
  stack: "city",
  types: c.types,
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
  copies: c.copies,
  flavor: c.flavor,
  blood: c.blood,
  agenda: c.agenda,
});

export const toUnstructuredMonster = ([id, c]: Pair<Monster>): UnMonster => ({
  stack: "monster",
  types: ["monster"],
  id,
  illustrator: c.illustrator,
  image: imageSrc(id),
  name: c.name,
  set: c.set,
  text: c.text,
  blood: c.blood,
  attributeMental: c.mental,
  attributePhysical: c.physical,
  attributeSocial: c.social,
  bloodPotency: c.bloodPotency,
  agenda: c.agenda,
});