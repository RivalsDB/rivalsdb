import { db, sql } from "../db.js";

type DecklistMeta = {
  decklistId: string;
  description?: string;
};

export type WithMeta<D> = D & Pick<DecklistMeta, "description">;

export const updateOrCreate = async (
  decklistId: string,
  description?: string
): Promise<void> => {
  const res = await db.query(sql`
    INSERT INTO decklist_metas (
      decklist_id,
      description
    )
    VALUES (
      ${decklistId},
      ${description}
    )
    ON CONFLICT (decklist_id) DO UPDATE
    SET description = ${description}
  `);
  console.log("GOT", res);
};
