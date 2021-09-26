import { FastifyInstance } from "fastify";
import { createDecklist } from "../db/index.js";

interface DeckInput {
  name: string;
  agenda: string;
  haven: string;
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
}

export async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: DeckInput }>("/api/decklist", {
    schema: {
      body: {
        type: "object",
        required: ["agenda", "factionDeck", "haven", "libraryDeck", "name"],
        properties: {
          name: { type: "string" },
          agenda: { type: "string" },
          haven: { type: "string" },
          factionDeck: { type: "object" },
          libraryDeck: { type: "object" },
        },
      },
    },
    async handler(req, reply) {
      const leader = Object.entries(req.body.factionDeck).find(
        ([_, isLeader]) => isLeader
      );
      if (!leader) {
        reply.code(400);
        return;
      }

      const entry = await createDecklist("userId", req.body.name, {
        agenda: req.body.agenda,
        haven: req.body.haven,
        libraryDeck: req.body.libraryDeck,
        factionDeck: Object.keys(req.body.factionDeck),
        leader: leader[0],
      });
      reply.code(201);

      return entry;
    },
  });
}
