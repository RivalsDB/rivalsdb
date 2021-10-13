import { db, sql } from "./_db.js";
import { generateId } from "./_id.js";

interface Decklist {
  id: string;
  name: string;
  creatorId: string;
  agenda: string;
  haven: string;
  libraryDeck: {
    [cardId: string]: number;
  };
  leader: string;
  factionDeck: string[];
}

export async function createDecklist(
  creatorId: string,
  decklist: Omit<Decklist, "id" | "name" | "creatorId">,
  name: string
): Promise<Decklist> {
  const deckId = await generateId();
  await db.query(sql`
    INSERT INTO decklists
      (decklist_id, user_id, content, name, created_at, updated_at)
    VALUES
      (${deckId}, ${creatorId}, ${decklist}, ${name}, NOW(), NOW())
  `);
  return { ...decklist, id: deckId, name, creatorId };
}
