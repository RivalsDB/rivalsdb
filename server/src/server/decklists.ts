import { FastifyPluginAsync } from "fastify";
import {
  createDecklist,
  deleteDecklist,
  gameModeFromString,
  makeDecklistId,
  updateDecklist,
} from "../db/index.js";
import { signInRequired } from "./auth.js";
import {
  fetchAllByUser,
  fetchAllPublic,
  fetchAllPublicByUser,
  fetchById,
  toTransferObject,
  TransferObject,
} from "../entity/decklist.js";

interface DeckInput {
  agenda: string;
  haven: string;
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
  gameMode: "both" | "headToHead" | "multiplayer";
  name?: string;
}
interface DeckInputV2 {
  agenda: string;
  haven: string;
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
  gameMode: "both" | "headToHead" | "multiplayer";
  name?: string;
  public?: boolean;
}
interface DeckOutput {
  id: string;
  creatorId: string;
  name?: string;
  agenda: string;
  haven: string;
  gameMode: "both" | "headToHead" | "multiplayer";
  factionDeck: { [id: string]: boolean };
  libraryDeck: { [id: string]: number };
}

function formatFactionDeck(faction: string[], leaderId: string) {
  return faction.reduce<Record<string, boolean>>((faction, cardId) => {
    faction[cardId] = cardId === leaderId;
    return faction;
  }, {});
}

function findLeader(factionDeck: Record<string, boolean>): string | null {
  return (
    Object.entries(factionDeck).find(([, isLeader]) => isLeader)?.[0] ?? null
  );
}

const postV1: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: DeckInput }>("/decklist", {
    schema: {
      body: {
        type: "object",
        required: ["agenda", "factionDeck", "haven", "libraryDeck", "gameMode"],
        properties: {
          name: { type: "string" },
          agenda: { type: "string" },
          haven: { type: "string" },
          factionDeck: { type: "object" },
          libraryDeck: { type: "object" },
          gameMode: {
            type: "string",
            enum: ["both", "headToHead", "multiplayer"],
          },
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
            public: { type: "boolean" },
          },
        },
      },
    },

    async handler(req, reply): Promise<DeckOutput> {
      const leader = findLeader(req.body.factionDeck);
      if (leader === null) {
        reply.code(400);
        return reply.send("Invalid leader");
      }

      const deckId = await makeDecklistId();

      const decklist = {
        agenda: req.body.agenda,
        haven: req.body.haven,
        libraryDeck: req.body.libraryDeck,
        factionDeck: Object.keys(req.body.factionDeck),
        leader,
      };
      const meta = {
        creatorId: req.user.sub,
        gameMode: gameModeFromString(req.body.gameMode),
        name: req.body.name,
        id: deckId,
        public: true,
      };
      const entry = await createDecklist(decklist, meta);

      reply.code(201);
      return {
        id: entry.id,
        creatorId: entry.creatorId,
        name: entry.name,
        agenda: entry.agenda,
        haven: entry.haven,
        libraryDeck: entry.libraryDeck,
        gameMode: entry.gameMode,
        factionDeck: formatFactionDeck(entry.factionDeck, entry.leader),
      };
    },
  });
};

const putV1: FastifyPluginAsync = async (fastify) => {
  fastify.put<{ Params: { deckId: string }; Body: DeckInput }>(
    "/decklist/:deckId",
    {
      schema: {
        body: {
          type: "object",
          required: [
            "agenda",
            "factionDeck",
            "haven",
            "libraryDeck",
            "gameMode",
          ],
          properties: {
            name: { type: "string" },
            agenda: { type: "string" },
            haven: { type: "string" },
            factionDeck: { type: "object" },
            libraryDeck: { type: "object" },
            gameMode: {
              type: "string",
              enum: ["both", "headToHead", "multiplayer"],
            },
            public: { type: "boolean" },
          },
        },
      },

      async handler(req, reply): Promise<void> {
        const leader = findLeader(req.body.factionDeck);
        if (leader == null) {
          reply.code(400);
          return reply.send("Invalid leader");
        }

        const oldDecklist = await fetchById(req.params.deckId);
        if (oldDecklist == null) {
          reply.code(404);
          return reply.send();
        } else if (oldDecklist.creatorId !== req.user.sub) {
          reply.code(403);
          return reply.send();
        }

        const newDecklist = {
          agenda: req.body.agenda,
          haven: req.body.haven,
          libraryDeck: req.body.libraryDeck,
          factionDeck: Object.keys(req.body.factionDeck),
          leader,
        };
        const meta = {
          name: req.body.name,
          gameMode: gameModeFromString(req.body.gameMode),
          public: oldDecklist.public,
        };

        await updateDecklist(oldDecklist.id, newDecklist, meta);

        reply.code(204);
      },
    }
  );
};

const putV2: FastifyPluginAsync = async (fastify) => {
  fastify.put<{ Params: { deckId: string }; Body: DeckInputV2 }>(
    "/decklist/:deckId",
    {
      schema: {
        body: {
          type: "object",
          required: [
            "agenda",
            "factionDeck",
            "haven",
            "libraryDeck",
            "gameMode",
          ],
          properties: {
            name: { type: "string" },
            agenda: { type: "string" },
            haven: { type: "string" },
            factionDeck: { type: "object" },
            libraryDeck: { type: "object" },
            gameMode: {
              type: "string",
              enum: ["both", "headToHead", "multiplayer"],
            },
            public: { type: "boolean" },
          },
        },
      },

      async handler(req, reply): Promise<void> {
        const leader = findLeader(req.body.factionDeck);
        if (leader == null) {
          reply.code(400);
          return reply.send("Invalid leader");
        }

        const newDecklist = {
          agenda: req.body.agenda,
          haven: req.body.haven,
          libraryDeck: req.body.libraryDeck,
          factionDeck: Object.keys(req.body.factionDeck),
          leader,
        };
        const meta = {
          creatorId: req.user.sub,
          gameMode: gameModeFromString(req.body.gameMode),
          name: req.body.name,
          id: req.params.deckId,
          public: req.body.public ?? true,
        };

        const oldDecklist = await fetchById(req.params.deckId);
        if (oldDecklist == null) {
          await createDecklist(newDecklist, meta);
          reply.code(201);
          return reply.send();
        }

        if (oldDecklist.creatorId !== req.user.sub) {
          reply.code(403);
          return reply.send();
        }

        await updateDecklist(oldDecklist.id, newDecklist, meta);

        reply.code(204);
      },
    }
  );
};

const deleteV1: FastifyPluginAsync = async (fastify) => {
  fastify.delete<{ Params: { deckId: string } }>("/decklist/:deckId", {
    async handler(req, reply): Promise<void> {
      const decklist = await fetchById(req.params.deckId);
      if (decklist == null) {
        reply.code(404);
        return reply.send();
      }

      if (decklist.creatorId !== req.user.sub) {
        reply.code(403);
        return reply.send();
      }

      await deleteDecklist(decklist.id);
      reply.code(204);
    },
  });
};

const indexV1: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { userId?: string } }>("/decklist", {
    schema: {
      querystring: {
        userId: { type: "string" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
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
              creatorDisplayName: { type: "string" },
              creatorPatronage: {
                type: "string",
                enum: ["not_patron", "kindred"],
              },
              gameMode: {
                type: "string",
                enum: ["both", "headToHead", "multiplayer"],
              },
              public: { type: "boolean" },
            },
          },
        },
      },
    },
    async handler(req): Promise<TransferObject[]> {
      const decklists = await (req.query.userId == null
        ? fetchAllPublic()
        : req.query.userId === req.user?.sub
        ? fetchAllByUser(req.query.userId)
        : fetchAllPublicByUser(req.query.userId));

      return decklists.map(toTransferObject);
    },
  });
};

const getV1: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { deckId: string } }>("/decklist/:deckId", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            name: { type: "string" },
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
            creatorDisplayName: { type: "string" },
            creatorPatronage: {
              type: "string",
              enum: ["not_patron", "kindred"],
            },
            gameMode: {
              type: "string",
              enum: ["both", "headToHead", "multiplayer"],
            },
            public: { type: "boolean" },
          },
        },
      },
    },
    async handler(req, reply): Promise<TransferObject> {
      const decklist = await fetchById(req.params.deckId);
      if (decklist === null) {
        reply.code(404);
        return reply.send();
      }

      return toTransferObject(decklist);
    },
  });
};

export const v1Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(indexV1);
  fastify.register(getV1);

  fastify.register(async (fastify) => {
    fastify.register(signInRequired);
    fastify.register(postV1);
    fastify.register(putV1);
    fastify.register(deleteV1);
  });
};

export const v2Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(async (fastify) => {
    fastify.register(signInRequired);
    fastify.register(putV2);
  });
};
