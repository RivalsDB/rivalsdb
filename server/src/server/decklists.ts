import { FastifyPluginAsync } from "fastify";
import { createDecklist } from "../db/index.js";
import auth from "./auth.js";

interface DeckInput {
  name: string;
  agenda: string;
  haven: string;
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
}

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(auth);

  fastify.post<{ Body: DeckInput }>("/decklist", {
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
      response: {
        201: {
          type: "object",
          properties: {
            name: { type: "string" },
            agenda: { type: "string" },
            haven: { type: "string" },
            factionDeck: { type: "object" },
            libraryDeck: { type: "object" },
            decklist_id: { type: "number" },
            author_id: { type: "string" },
          },
        },
      },
    },

    async handler(req, reply) {
      const leader = Object.entries(req.body.factionDeck).find(
        ([_, isLeader]) => isLeader
      );

      if (!leader) {
        reply.code(400);
        return reply.send("Invalid leader");
      }

      const entry = await createDecklist(req.user.id, req.body.name, {
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
};

export default routes;
