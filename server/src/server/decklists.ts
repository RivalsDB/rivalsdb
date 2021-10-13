import { FastifyPluginAsync } from "fastify";
import { createDecklist, createUserIfNeeded } from "../db/index.js";
import auth from "./auth.js";

interface DeckInput {
  name: string;
  agenda: string;
  haven: string;
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
}
interface DeckOutput extends DeckInput {
  id: string;
  creatorId: string;
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
            name: { anyOf: [{ type: "null" }, { type: "string" }] },
            agenda: { type: "string" },
            haven: { type: "string" },
            factionDeck: {
              type: "object",
              additionalProperties: { type: "boolean" },
            },
            libraryDeck: {
              type: "object",
              additionalProperties: { type: "integer" },
            },
            id: { type: "string" },
            creatorId: { type: "string" },
          },
        },
      },
    },

    async handler(req, reply): Promise<DeckOutput> {
      const leader = Object.entries(req.body.factionDeck).find(
        ([, isLeader]) => isLeader
      )?.[0];

      if (!leader) {
        reply.code(400);
        return reply.send("Invalid leader");
      }

      await createUserIfNeeded(req.user.id, req.user.email);

      const entry = await createDecklist(
        req.user.id,
        {
          agenda: req.body.agenda,
          haven: req.body.haven,
          libraryDeck: req.body.libraryDeck,
          factionDeck: Object.keys(req.body.factionDeck),
          leader,
        },
        req.body.name
      );

      reply.code(201);
      return {
        ...entry,
        factionDeck: entry.factionDeck.reduce<Record<string, boolean>>(
          (factionDeck, character) => {
            factionDeck[character] = character === leader;
            return factionDeck;
          },
          {}
        ),
      };
    },
  });
};

export default routes;
