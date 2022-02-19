import { db, sql } from "../db/index.js";
import * as GameMode from "./gameMode.js";
import * as Patronage from "./patronage.js";

export type Decklist = {
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
  gameMode: GameMode.GameMode;
  public: boolean;
  patronage: Patronage.PatronageType;
};

export type TransferObject = {
  name?: string;
  agenda: string;
  haven: string;
  id: string;
  creatorId: string;
  creatorDisplayName?: string;
  creatorPatronage: "not_patron" | "kindred";
  public: boolean;
  factionDeck: Record<string, boolean>;
  libraryDeck: Record<string, number>;
  gameMode: "both" | "headToHead" | "multiplayer";
};

export const toTransferObject = (decklist: Decklist): TransferObject => ({
  agenda: decklist.agenda,
  creatorDisplayName: decklist.displayName,
  creatorId: decklist.creatorId,
  haven: decklist.haven,
  id: decklist.id,
  libraryDeck: decklist.libraryDeck,
  name: decklist.name,
  public: decklist.public,
  creatorPatronage: Patronage.toString(decklist.patronage),
  gameMode: GameMode.toString(decklist.gameMode),
  factionDeck: decklist.factionDeck.reduce<Record<string, boolean>>(
    (faction, cardId) => {
      faction[cardId] = cardId === decklist.leader;
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
function fromRow(row: any): Decklist {
  return {
    id: row.decklist_id,
    name: (row.name?.length ?? 0) > 0 ? row.name : undefined,
    creatorId: row.user_id,
    agenda: row.content.agenda,
    haven: row.content.haven,
    leader: row.content.leader,
    libraryDeck: row.content.libraryDeck,
    factionDeck: row.content.factionDeck,
    gameMode: GameMode.fromString(row.game_mode),
    public: row.public,
    displayName:
      typeof row.display_name === "string" ? row.display_name : undefined,
    patronage: Patronage.fromString(row.patronage_type),
  };
}

export const fetchAllPublic = async (): Promise<Decklist[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.public IS true
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchAllPublicByUser = async (
  userId: string
): Promise<Decklist[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.public IS true AND d.user_id = ${userId}
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchAllByUser = async (userId: string): Promise<Decklist[]> => {
  const rows = await db.query(
    sql`${DECKLIST_SELECT}
    WHERE d.user_id = ${userId}
    ORDER BY d.updated_at DESC`
  );

  return rows.map(fromRow);
};

export const fetchById = async (
  decklistId: string
): Promise<null | Decklist> => {
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
