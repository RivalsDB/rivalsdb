import { FastifyPluginAsync } from "fastify";
import { signInRequired } from "./auth.js";
import {
  fetchById,
  toTransferObject,
  createIdempotent,
  update,
  UserError,
} from "../entity/user.js";

interface UserOutput {
  userId: string;
  displayName?: string;
  patronage: string;
}

const v1Update: FastifyPluginAsync = async (fastify) => {
  fastify.put<{ Params: { userId: string }; Body: { displayName: string } }>(
    "/users/:userId",
    {
      schema: {
        body: {
          type: "object",
          required: ["displayName"],
          properties: {
            displayName: { type: "string" },
          },
        },
      },

      async handler(req, reply): Promise<void> {
        const user = await fetchById(req.params.userId);
        if (user == null) {
          reply.code(404);
          return reply.send();
        }

        if (user.id !== req.user.sub) {
          reply.code(403);
          return reply.send({ error: "ACCESS_DENIED" });
        }

        const res = await update(user.id, {
          displayName: req.body.displayName,
        });
        if (res === UserError.DISPLAY_NAME_MUST_BE_UNIQUE) {
          reply.code(403);
          return reply.send({ error: "DISPLAY_NAME_MUST_BE_UNIQUE" });
        }

        reply.code(204);
      },
    }
  );
};

const v2Update: FastifyPluginAsync = async (fastify) => {
  fastify.patch<{
    Params: { userId: string };
    Body: Partial<{ displayName: string }>;
  }>("/users/:userId", {
    schema: {
      body: {
        type: "object",
        properties: {
          displayName: { type: "string" },
        },
      },
    },

    async handler(req, reply): Promise<void> {
      const user = await fetchById(req.params.userId);
      if (user == null) {
        reply.code(404);
        return reply.send();
      }

      if (user.id !== req.user.sub) {
        reply.code(403);
        return reply.send({ error: "ACCESS_DENIED" });
      }

      const newProps: Partial<{ displayName: string }> = {};
      if (typeof req.body.displayName === "string") {
        newProps.displayName = req.body.displayName;
      }

      if (Object.keys(newProps).length === 0) {
        reply.code(204);
        return reply.send();
      }

      const res = await update(user.id, newProps);
      if (res === UserError.DISPLAY_NAME_MUST_BE_UNIQUE) {
        reply.code(403);
        return reply.send({ error: "DISPLAY_NAME_MUST_BE_UNIQUE" });
      }

      reply.code(204);
    },
  });
};

const v2Create: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: { email: string } }>("/users", {
    schema: {
      body: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string" },
        },
      },
    },

    async handler(req, reply): Promise<void> {
      await createIdempotent({ id: req.user.sub, email: req.body.email });
      reply.code(201);
      reply.send();
    },
  });
};

const read: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { userId: string } }>("/users/:userId", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            userId: { type: "string" },
            displayName: { type: "string" },
            patronage: { type: "string" },
          },
        },
      },
    },
    async handler(req, reply): Promise<UserOutput> {
      const user = await fetchById(req.params.userId);
      if (user == null) {
        reply.code(404);
        return reply.send();
      }
      return toTransferObject(user);
    },
  });
};

export const v1routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(read);
  fastify.register(async (fastify) => {
    fastify.register(signInRequired);
    fastify.register(v1Update);
  });
};

export const v2routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(read);
  fastify.register(async (fastify) => {
    fastify.register(signInRequired);
    fastify.register(v2Update);
    fastify.register(v2Create);
  });
};
