import { FastifyPluginAsync } from "fastify";
import { db, sql } from "../db.js";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: { ok: { type: "boolean" } },
        },
        503: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            databaseError: { type: "boolean" },
          },
        },
      },
    },
    async handler(req, reply) {
      const [{ healthy }] = await db.query(sql`SELECT true AS healthy`);
      if (healthy) {
        return reply.code(200).send({ ok: true });
      }

      return reply.code(503).send({ ok: false, databaseError: true });
    },
  });
};
