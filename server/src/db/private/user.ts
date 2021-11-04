import { isSQLError, db, sql, SQLQuery } from "./_db.js";
import { DbError } from "./_errors.js";

interface User {
  userId: string;
  email: string;
  displayName?: string;
}

export async function fetchUser(id: string): Promise<null | User> {
  const [res] = await db.query(sql`
  SELECT
    user_id,
    email,
    display_name
  FROM users
  WHERE user_id = ${id}
  LIMIT 1
  `);

  if (!res) {
    return null;
  }
  return {
    userId: res.user_id,
    email: res.email,
    displayName:
      typeof res.display_name === "string" ? res.display_name : undefined,
  };
}

export async function createUserIfNeeded(id: string, email: string) {
  await db.query(sql`
    INSERT INTO users
      (user_id, email, created_at, updated_at)
    VALUES
      (${id}, ${email}, NOW(), NOW())
    ON CONFLICT DO NOTHING
  `);
}

export async function updateUser(
  id: string,
  props: Partial<Omit<User, "userId">>
): Promise<undefined | DbError> {
  const fragments = Object.entries(props).reduce<SQLQuery[]>(
    (fragments, [property, newValue]) => {
      switch (property) {
        case "email": {
          fragments.push(sql`email = ${newValue}`);
        }
        case "displayName": {
          fragments.push(sql`display_name = ${newValue}`);
        }
      }
      return fragments;
    },
    []
  );

  try {
    await db.query(sql`
    UPDATE users
    SET ${sql.join(fragments, ",")}
    WHERE user_id = ${id}
  `);
    return undefined;
  } catch (error) {
    if (!isSQLError(error)) {
      throw error;
    }
    if (error.constraint === "users_display_name_key") {
      DbError.DISPLAY_NAME_MUST_BE_UNIQUE;
    }
  }
}
