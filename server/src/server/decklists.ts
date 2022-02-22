import { generateId } from "@rivalsdb/id";
import { FastifyPluginAsync } from "fastify";
import { signInRequired } from "./auth.js";
import * as Deck from "../entity/deck.js";
import * as GameMode from "../entity/gameMode.js";

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
  agenda: string;
  creatorId: string;
  factionDeck: { [id: string]: boolean };
  gameMode: "both" | "headToHead" | "multiplayer";
  haven: string;
  id: string;
  libraryDeck: { [id: string]: number };
  name?: string;
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

      const id = await generateId();

      const agenda = req.body.agenda;
      const factionDeck = Object.keys(req.body.factionDeck);
      const haven = req.body.haven;
      const libraryDeck = req.body.libraryDeck;
      const decklist = { agenda, factionDeck, haven, leader, libraryDeck };

      const creatorId = req.user.sub;
      const gameMode = GameMode.fromString(req.body.gameMode);
      const name = req.body.name;
      const meta = { creatorId, gameMode, name, public: true };

      await Deck.create(id, decklist, meta);

      reply.code(201);
      return {
        agenda,
        creatorId,
        haven,
        id,
        libraryDeck,
        name,
        factionDeck: req.body.factionDeck,
        gameMode: GameMode.toString(gameMode),
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

        const oldDecklist = await Deck.fetchById(req.params.deckId);
        if (oldDecklist == null) {
          reply.code(404);
          return reply.send();
        } else if (oldDecklist.creator.id !== req.user.sub) {
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
        const newMeta = {
          creatorId: oldDecklist.meta.creatorId,
          public: oldDecklist.meta.public,
          name: req.body.name,
          gameMode: GameMode.fromString(req.body.gameMode),
        };

        await Deck.update(oldDecklist.id, newDecklist, newMeta);

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

        const decklist = {
          agenda: req.body.agenda,
          haven: req.body.haven,
          libraryDeck: req.body.libraryDeck,
          factionDeck: Object.keys(req.body.factionDeck),
          leader,
        };
        const meta = {
          creatorId: req.user.sub,
          public: req.body.public ?? true,
          name: req.body.name,
          gameMode: GameMode.fromString(req.body.gameMode),
        };

        const oldDeck = await Deck.fetchById(req.params.deckId);
        if (oldDeck == null) {
          await Deck.create(req.params.deckId, decklist, meta);
          reply.code(201);
          return reply.send();
        }

        if (oldDeck.creator.id !== req.user.sub) {
          reply.code(403);
          return reply.send();
        }

        await Deck.update(req.params.deckId, decklist, meta);

        reply.code(204);
      },
    }
  );
};

const deleteV1: FastifyPluginAsync = async (fastify) => {
  fastify.delete<{ Params: { deckId: string } }>("/decklist/:deckId", {
    async handler(req, reply): Promise<void> {
      const decklist = await Deck.fetchById(req.params.deckId);
      if (decklist == null) {
        reply.code(404);
        return reply.send();
      }

      if (decklist.creator.id !== req.user.sub) {
        reply.code(403);
        return reply.send();
      }

      await Deck.destroyById(decklist.id);
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
    async handler(req): Promise<Deck.TransferObject[]> {
      const decklists = await (req.query.userId == null
        ? Deck.fetchAllPublic()
        : req.query.userId === req.user?.sub
        ? Deck.fetchAllByUser(req.query.userId)
        : Deck.fetchAllPublicByUser(req.query.userId));

      return decklists.map(Deck.toTransferObject);
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
    async handler(req, reply): Promise<Deck.TransferObject> {
      const decklist = await Deck.fetchById(req.params.deckId);
      if (decklist === null) {
        reply.code(404);
        return reply.send();
      }

      return Deck.toTransferObject(decklist);
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
