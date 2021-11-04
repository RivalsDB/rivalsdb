import { FastifyPluginAsync } from "fastify";
import { fetchUser, updateUser, DbError } from "../db/index.js";
import auth from "./auth.js";

interface UserInput {
  displayName: string;
}
interface UserOutput {
  userId: string;
  displayName?: string;
}

const privateRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(auth);

  fastify.put<{ Params: { userId: string }; Body: UserInput }>(
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
        const user = await fetchUser(req.params.userId);
        if (user == null) {
          reply.code(404);
          return reply.send();
        }

        if (user.userId !== req.user.id) {
          reply.code(403);
          return reply.send({ error: "ACCESS_DENIED" });
        }

        const res = await updateUser(user.userId, {
          displayName: req.body.displayName,
        });
        if (res === DbError.DISPLAY_NAME_MUST_BE_UNIQUE) {
          reply.code(403);
          return reply.send({ error: "DISPLAY_NAME_MUST_BE_UNIQUE" });
        }

        reply.code(204);
      },
    }
  );
};

const publicRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get<{ Params: { userId: string } }>("/users/:userId", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            userId: { type: "string" },
            displayName: { type: "string" },
          },
        },
      },
    },
    async handler(req, reply): Promise<UserOutput> {
      const user = await fetchUser(req.params.userId);
      if (user == null) {
        reply.code(404);
        return reply.send();
      }
      return { userId: user.userId, displayName: user.displayName };
    },
  });
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);
};
export default routes;
