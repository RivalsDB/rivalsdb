import { db, sql } from "./_db.js";

export async function createUserIfNeeded(id: string, email: string) {
  await db.query(sql`
    INSERT INTO users
      (user_id, email, created_at, updated_at)
    VALUES
      (${id}, ${email}, NOW(), NOW())
    ON CONFLICT DO NOTHING
  `);
}
