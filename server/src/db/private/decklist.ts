import { db, sql } from "./_db.js";
import { generateId } from "./_id.js";
import { GAME_MODE, gameModeFromString } from "./enums.js";

interface Decklist {
  agenda: string;
  haven: string;
  libraryDeck: {
    [cardId: string]: number;
  };
  leader: string;
  factionDeck: string[];
}
interface MetaDecklist {
  id: string;
  creatorId: string;
  gameMode: GAME_MODE;
  public: boolean;
  name?: string;
}

function stringOrNull(str?: string): string | null {
  if (typeof str !== "string") {
    return null;
  }
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return null;
  }
  return trimmed;
}

export const makeDecklistId = generateId;

export async function createDecklist(
  decklist: Decklist,
  meta: MetaDecklist
): Promise<Decklist & MetaDecklist> {
  const [inserted] = await db.query(sql`
    INSERT INTO decklists (
      decklist_id,
      user_id,
      content,
      name,
      game_mode,
      public,
      created_at,
      updated_at
    )
    VALUES (
      ${meta.id},
      ${meta.creatorId},
      ${decklist},
      ${stringOrNull(meta.name)},
      ${meta.gameMode},
      ${meta.public},
      NOW(),
      NOW()
    )
    RETURNING *
  `);
  const { content, created_at, updated_at, decklist_id, ...otherProps } =
    inserted;
  return { ...content, ...otherProps, id: decklist_id };
}

export async function deleteDecklist(decklistId: string): Promise<void> {
  await db.query(sql`
    DELETE FROM decklists
    WHERE decklist_id = ${decklistId}
  `);
}

export async function updateDecklist(
  decklistId: string,
  decklist: Decklist,
  meta: Pick<MetaDecklist, "gameMode" | "name" | "public">
): Promise<void> {
  await db.query(sql`
    UPDATE
      decklists
    SET
      content = ${decklist},
      name = ${stringOrNull(meta.name)},
      game_mode = ${meta.gameMode},
      public = ${meta.public},
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
  gameMode: GAME_MODE;
  public: boolean;
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
      game_mode,
      public,
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

export async function fetchPublicDecklists(): Promise<ExtendedDecklist[]> {
  const rows = await db.query(sql`
    SELECT
      d.decklist_id,
      d.name,
      d.user_id,
      d.content,
      d.game_mode,
      d.public,
      u.display_name
    FROM decklists AS d
    LEFT JOIN users AS u USING (user_id)
    WHERE d.public IS true
    ORDER BY d.updated_at DESC
  `);

  return rows.map(rowToDecklist);
}

export async function fetchPublicDecklistsForUser(
  userId: string
): Promise<ExtendedDecklist[]> {
  const rows = await db.query(sql`
    SELECT
      d.decklist_id,
      d.name,
      d.user_id,
      d.content,
      d.game_mode,
      d.public,
      u.display_name
    FROM decklists AS d
    LEFT JOIN users AS u USING (user_id)
    WHERE d.user_id = ${userId} AND d.public IS true
    ORDER BY d.updated_at DESC
  `);

  return rows.map(rowToDecklist);
}

export async function fetchAllDecklistsForUser(
  userId: string
): Promise<ExtendedDecklist[]> {
  const rows = await db.query(sql`
    SELECT
      d.decklist_id,
      d.name,
      d.user_id,
      d.content,
      d.game_mode,
      d.public,
      u.display_name
    FROM decklists AS d
    LEFT JOIN users AS u USING (user_id)
    WHERE d.user_id = ${userId}
    ORDER BY d.updated_at DESC
  `);

  return rows.map(rowToDecklist);
}

function rowToDecklist(row: {
  decklist_id: string;
  name: string;
  user_id: string;
  content: Omit<Decklist, "id" | "name" | "creatorId">;
  display_name?: string;
  game_mode: string;
  public: boolean;
}): ExtendedDecklist {
  return {
    id: row.decklist_id,
    name: (row.name?.length ?? 0) > 0 ? row.name : undefined,
    creatorId: row.user_id,
    agenda: row.content.agenda,
    haven: row.content.haven,
    leader: row.content.leader,
    libraryDeck: row.content.libraryDeck,
    factionDeck: row.content.factionDeck,
    displayName:
      typeof row.display_name === "string" ? row.display_name : undefined,
    gameMode: gameModeFromString(row.game_mode),
    public: row.public,
  };
}
