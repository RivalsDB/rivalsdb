import createConnectionPool from "@databases/pg";
import { databaseUrl } from "../../env.js";

export { sql, SQLQuery, isSQLError } from "@databases/pg";

export const db = createConnectionPool({
  connectionString: databaseUrl,
  bigIntMode: "bigint",
});

export async function closeDbPool() {
  await db.dispose();
}
