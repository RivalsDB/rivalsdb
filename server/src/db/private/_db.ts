import createConnectionPool, { sql } from "@databases/pg";
import { databaseUrl } from "../../env.js";

export const db = createConnectionPool({
  database: databaseUrl,
  bigIntMode: "bigint",
});

export { sql };
