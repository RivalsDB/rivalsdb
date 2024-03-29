import {
  AttackType,
  CardId,
  CardSet,
  Clan,
  Discipline,
  Illustrator,
  LibraryCardType,
  Cardpool,
  md } from "./common.js";
 
export type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
}
  
export type Haven = {
  stack: "haven";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
}
  
export type Faction = {
  stack: "faction";
  name: string;
  clan: Clan;
  bloodPotency: number;
  physical: number;
  social: number;
  mental: number;
  disciplines: Partial<Record<Discipline, 1 | 2 | 3>>;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
}

export type Library = {
  stack: "library";
  name: string;
  types: LibraryCardType[];
  clan?: Clan;
  bloodPotencyRequirement?: number;
  damage?: number;
  shield?: number;
  attack?: AttackType | AttackType[];
  reactions?: AttackType | AttackType[];
  text: string;
  disciplines?: Discipline[];
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
};

export const agendas: Record<CardId, Agenda> = {

//Agendas    

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

}

export const factions: Record<CardId, Faction> = {

// Faction Cards
        
}

export const library: Record<CardId, Library> = {

  //Library Cards
  
}