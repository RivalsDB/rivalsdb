import { FastifyPluginAsync } from "fastify";
import auth0Verify from "fastify-auth0-verify";
import fastifyPlugin from "fastify-plugin";

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: {
      aud: string[];
      iat: number;
      exp: number;
      iss: string;
      sub: string;
      azp: string;
      scope: string;
    };
  }
}

const authenticatedPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(auth0Verify, {
    domain: "rivalsdb.eu.auth0.com",
    audience: "https://www.rivalsdb.app/api",
  });

  fastify.addHook("preHandler", async (req) => {
    try {
      await req.jwtVerify();
    } catch (e) {
      console.log(e);
    }
  });
};

export const authenticated = fastifyPlugin(authenticatedPlugin);

const signInRequiredPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", async (req, reply) => {
    if (!req.user) {
      reply.code(401);
      return reply.send();
    }
  });
};

export const signInRequired = fastifyPlugin(signInRequiredPlugin);
