import { db, sql } from "../db.js";
import * as GameMode from "./gameMode.js";
import * as Patronage from "./patronage.js";
import { User } from "./user.js";

type Deck = {
  id: string;
  decklist: Decklist;
  meta: Meta;
};

type WithCreator<D> = D & {
  creator: Pick<User, "id" | "displayName" | "patronage">;
};

type Meta = {
  creatorId: string;
  gameMode: GameMode.GameMode;
  public: boolean;
  name?: string;
};

type Decklist = {
  agenda: string;
  haven: string;
  libraryDeck: Record<string, number>;
  factionDeck: string[];
  leader: string;
};

export type TransferObject = {
  agenda: string;
  creatorDisplayName?: string;
  creatorId: string;
  creatorPatronage: "not_patron" | "kindred";
  factionDeck: Record<string, boolean>;
  gameMode: "both" | "headToHead" | "multiplayer";
  haven: string;
  id: string;
  libraryDeck: Record<string, number>;
  name?: string;
  public: boolean;
};

export const toTransferObject = (deck: WithCreator<Deck>): TransferObject => ({
  agenda: deck.decklist.agenda,
  creatorDisplayName: deck.creator?.displayName,
  creatorId: deck.meta.creatorId,
  haven: deck.decklist.haven,
  id: deck.id,
  libraryDeck: deck.decklist.libraryDeck,
  name: deck.meta.name,
  public: deck.meta.public,
  creatorPatronage: Patronage.toString(deck.creator?.patronage),
  gameMode: GameMode.toString(deck.meta.gameMode),
  factionDeck: deck.decklist.factionDeck.reduce<Record<string, boolean>>(
    (faction, cardId) => {
      faction[cardId] = cardId === deck.decklist.leader;
      return faction;
    },
    {}
  ),
});

const DECKLIST_SELECT = sql`
SELECT
  d.decklist_id,
  d.name,
  d.user_id,
  d.content,
  d.game_mode,
  d.public,
  u.display_name,
  u.patronage_type
FROM decklists AS d
LEFT JOIN users AS u USING (user_id)
`;
function fromRow(row: any): WithCreator<Deck> {
  return {
    id: row.decklist_id,
    meta: {
      creatorId: row.user_id,
      name: (row.name?.length ?? 0) > 0 ? row.name : undefined,
      gameMode: GameMode.fromString(row.game_mode),
      public: row.public,
    },
    decklist: {
      agenda: row.content.agenda,
      haven: row.content.haven,
      leader: row.content.leader,
      libraryDeck: row.content.libraryDeck,
      factionDeck: row.content.factionDeck,
    },
    creator: {
      id: row.user_id,
      patronage: Patronage.fromString(row.patronage_type),
      displayName:
        typeof row.display_name === "string" ? row.display_name : undefined,
    },
  };
}

export const fetchAllPublic = async (): Promise<WithCreator<Deck>[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.public IS true
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchAllPublicByUser = async (
  userId: string
): Promise<WithCreator<Deck>[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.public IS true AND d.user_id = ${userId}
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchAllByUser = async (
  userId: string
): Promise<WithCreator<Deck>[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.user_id = ${userId}
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchById = async (
  decklistId: string
): Promise<null | WithCreator<Deck>> => {
  const [row] = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.decklist_id = ${decklistId}
    LIMIT 1`
  );
  if (!row) {
    return null;
  }

  return fromRow(row);
};

export async function create(
  id: string,
  decklist: Decklist,
  meta: Meta
): Promise<void> {
  await db.query(sql`
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
      ${id},
      ${meta.creatorId},
      ${decklist},
      ${stringOrNull(meta.name)},
      ${GameMode.toString(meta.gameMode)},
      ${meta.public},
      NOW(),
      NOW()
    )
    RETURNING *
  `);
}

export async function update(
  id: string,
  decklist: Decklist,
  meta: Pick<Meta, "name" | "gameMode" | "public">
): Promise<void> {
  await db.query(sql`
    UPDATE decklists
    SET
      content = ${decklist},
      name = ${stringOrNull(meta.name)},
      game_mode = ${GameMode.toString(meta.gameMode)},
      public = ${meta.public},
      updated_at = NOW()
    WHERE decklist_id = ${id}
  `);
}

export const destroyById = async (id: string): Promise<void> => {
  await db.query(sql`DELETE FROM decklists WHERE decklist_id = ${id}`);
};

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
