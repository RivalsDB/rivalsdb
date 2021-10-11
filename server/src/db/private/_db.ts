import createConnectionPool, { sql } from "@databases/pg";
import { databaseUrl } from "../../env.js";

export const db = createConnectionPool({
  connectionString: databaseUrl,
  bigIntMode: "bigint",
});

export { sql };
