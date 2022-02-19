import { db, sql } from "../db/index.js";
import * as Patronage from "./patronage.js";

export type User = {
  id: string;
  email: string;
  patronage: Patronage.PatronageType;
  displayName?: string;
};

export const toTransferObject = (user: User) => ({
  userId: user.id,
  patronage: Patronage.toString(user.patronage),
  displayName: user.displayName,
});

export const fetchById = async (id: string): Promise<User | null> => {
  const [res] = await db.query(sql`
      SELECT user_id, email, display_name, patronage_type
      FROM users
      WHERE user_id = ${id}
      LIMIT 1
      `);

  if (!res) {
    return null;
  }
  return fromRow(res);
};

function fromRow(row: any): User {
  return {
    id: row.user_id,
    email: row.email,
    patronage: Patronage.fromString(row.patronage_type),
    displayName:
      typeof row.display_name === "string" ? row.display_name : undefined,
  };
}
