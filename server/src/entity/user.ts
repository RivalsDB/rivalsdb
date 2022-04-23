import { db, sql, SQLQuery, isSQLError } from "../db.js";
import * as Patronage from "./patronage.js";

export const enum UserError {
  DISPLAY_NAME_MUST_BE_UNIQUE,
}

export type User = {
  id: string;
  email: string;
  patronage: Patronage.PatronageType;
  displayName?: string;
};

export const toTransferObject = (user: User) => ({
  userId: user.id,
  patronage: user.patronage,
  displayName: user.displayName,
});

function fromRow(row: any): User {
  return {
    id: row.user_id,
    email: row.email,
    patronage: Patronage.fromString(row.patronage_type),
    displayName:
      typeof row.display_name === "string" ? row.display_name : undefined,
  };
}

export const createIdempotent = async (props: {
  id: string;
  email: string;
}): Promise<void> => {
  await db.query(sql`
    INSERT INTO users
      (user_id, email, created_at, updated_at)
    VALUES
      (${props.id}, ${props.email}, NOW(), NOW())
    ON CONFLICT DO NOTHING
  `);
};

export const fetchById = async (id: string): Promise<null | User> => {
  const [res] = await db.query(sql`
      SELECT user_id, email, display_name, patronage_type
      FROM users
      WHERE user_id = ${id}
      LIMIT 1
      `);

  return !res ? null : fromRow(res);
};

export const update = async (
  id: string,
  props: Partial<Pick<User, "displayName" | "email">>
): Promise<null | UserError> => {
  const fragments: SQLQuery[] = [];
  if (props.email) {
    fragments.push(sql`email = ${props.email}`);
  }
  if (props.displayName) {
    fragments.push(sql`display_name = ${props.displayName}`);
  }
  if (fragments.length === 0) {
    return null;
  }

  try {
    await db.query(
      sql`UPDATE users SET ${sql.join(fragments, ",")} WHERE user_id = ${id}`
    );
    return null;
  } catch (error) {
    if (isSQLError(error) && error.constraint === "users_display_name_key") {
      return UserError.DISPLAY_NAME_MUST_BE_UNIQUE;
    }
    throw error;
  }
};
