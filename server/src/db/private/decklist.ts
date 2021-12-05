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

export async function deleteDecklist(decklistId: string): Promise<void> {
  await db.query(sql`
    DELETE FROM decklists
    WHERE decklist_id = ${decklistId}
  `);
}

export async function updateDecklist(
  decklistId: string,
  decklist: Omit<Decklist, "id" | "name" | "creatorId">,
  name: string
): Promise<void> {
  await db.query(sql`
    UPDATE
      decklists
    SET
      content = ${decklist},
      name = ${name},
      updated_at = NOW()
    WHERE
      decklist_id = ${decklistId}
  `);
}

interface ExtendedDecklist {
  id: string;
  name?: string;
  creatorId: string;
  agenda: string;
  haven: string;
  libraryDeck: {
    [cardId: string]: number;
  };
  leader: string;
  factionDeck: string[];
  displayName?: string;
}

export async function fetchDecklist(
  decklistId: string
): Promise<ExtendedDecklist | null> {
  const [row] = await db.query(sql`
    SELECT
      decklist_id,
      name,
      user_id,
      content,
      users.display_name
    FROM decklists
    LEFT JOIN users USING (user_id)
    WHERE decklist_id = ${decklistId}
    LIMIT 1
  `);
  if (!row) {
    return null;
  }

  return rowToDecklist(row);
}

export async function fetchDecklists(): Promise<ExtendedDecklist[]> {
  const rows = await db.query(sql`
    SELECT
      decklist_id,
      name,
      user_id,
      content,
      users.display_name
    FROM decklists
    LEFT JOIN users USING (user_id)
    ORDER BY decklists.updated_at DESC
  `);

  return rows.map(rowToDecklist);
}

export async function fetchDecklistsForUser(
  userId: string
): Promise<ExtendedDecklist[]> {
  const rows = await db.query(sql`
    SELECT
      decklist_id,
      name,
      user_id,
      content,
      users.display_name
    FROM decklists
    LEFT JOIN users USING (user_id)
    WHERE user_id = ${userId}
    ORDER BY decklists.updated_at DESC
  `);

  return rows.map(rowToDecklist);
}

function rowToDecklist(row: {
  decklist_id: string;
  name: string;
  user_id: string;
  content: Omit<Decklist, "id" | "name" | "creatorId">;
  display_name?: string;
}): ExtendedDecklist {
  return {
    id: row.decklist_id,
    name: row.name.length > 0 ? row.name : undefined,
    creatorId: row.user_id,
    agenda: row.content.agenda,
    haven: row.content.haven,
    leader: row.content.leader,
    libraryDeck: row.content.libraryDeck,
    factionDeck: row.content.factionDeck,
    displayName:
      typeof row.display_name === "string" ? row.display_name : undefined,
  };
}
