import { Magic, SDKError, ErrorCode } from "@magic-sdk/admin";
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { magicSecretKey } from "../env.js";

declare module "fastify" {
  interface FastifyRequest {
    user: { id: string; email: string };
  }
}

const routes: FastifyPluginAsync = async (fastify) => {
  const mAdmin = new Magic(magicSecretKey);

  fastify.addHook("preHandler", async (req, reply) => {
    if (!req.headers.authorization) {
      reply.code(401);
      return reply.send();
    }
    const didToken = mAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization
    );

    try {
      mAdmin.token.validate(didToken);
    } catch (e) {
      if (e instanceof SDKError) {
        if (
          e.code === ErrorCode.ServiceError ||
          e.code === ErrorCode.ApiKeyMissing
        ) {
          reply.code(500);
          return reply.send();
        }
        if (e.code === ErrorCode.TokenExpired) {
          reply.code(401);
          return reply.send();
        }
        reply.code(400);
        return reply.send();
      }
      throw e;
    }

    const issuer = mAdmin.token.getIssuer(didToken);
    const { email } = await mAdmin.users.getMetadataByIssuer(issuer);
    if (!email) {
      reply.code(400);
      return reply.send();
    }

    req.user = {
      email,
      id: issuer,
    };
  });
};

export default fastifyPlugin(routes);
