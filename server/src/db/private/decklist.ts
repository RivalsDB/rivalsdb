const db: DecklistEntry[] = [];

interface Decklist {
  agenda: string;
  haven: string;
  libraryDeck: {
    [cardId: string]: number;
  };
  leader: string;
  factionDeck: string[];
}
interface DecklistEntry {
  decklist_id: number;
  author_id: string;
  name: string;
  decklist: Decklist;
}

export async function createDecklist(
  author: string,
  name: string,
  decklist: Decklist
): Promise<DecklistEntry> {
  const decklistEntry = {
    decklist_id: db.length,
    author_id: author,
    name,
    decklist,
  };
  db.push(decklistEntry);
  return decklistEntry;
}
