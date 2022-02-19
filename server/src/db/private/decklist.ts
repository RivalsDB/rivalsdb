import { db, sql } from "./_db.js";
import { generateId } from "./_id.js";
import { GAME_MODE } from "./enums.js";

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
