import { Magic, SDKError, ErrorCode } from "@magic-sdk/admin";
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { magicSecretKey } from "../env.js";

export const NoAuth = Symbol("NoAuth");
export const Expired = Symbol("Expired");
export const AuthError = Symbol("AuthError");
type AuthFail = typeof NoAuth | typeof Expired | typeof AuthError;
interface Authentication {
  id: string;
  email: string;
}

export function maybeAuth(
  result: Authentication | AuthFail
): Authentication | undefined {
  switch (result) {
    case NoAuth:
    case Expired:
    case AuthError:
      return undefined;
    default:
      return result;
  }
}

export function assertAuthenticated(
  result: Authentication | AuthFail
): asserts result is Authentication {
  if (maybeAuth(result) == null) {
    throw new Error("Auth error!");
  }
}

declare module "fastify" {
  interface FastifyRequest {
    authentication: Authentication | AuthFail;
  }
}

const mAdmin = new Magic(magicSecretKey);

const authenticatedPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", async (req, reply) => {
    const { authorization } = req.headers;
    if (!authorization) {
      req.authentication = NoAuth;
      return;
    }

    const didToken = mAdmin.utils.parseAuthorizationHeader(authorization);

    try {
      mAdmin.token.validate(didToken);
    } catch (e) {
      if (!(e instanceof SDKError)) {
        req.authentication = AuthError;
        throw e;
      }

      if (
        e.code === ErrorCode.ServiceError ||
        e.code === ErrorCode.ApiKeyMissing
      ) {
        req.authentication = AuthError;
        reply.code(500);
        return reply.send();
      }
      req.authentication = Expired;
      return;
    }

    const issuer = mAdmin.token.getIssuer(didToken);
    const { email } = await mAdmin.users.getMetadataByIssuer(issuer);
    if (!email) {
      req.authentication = AuthError;
      reply.code(400);
      return reply.send();
    }

    req.authentication = { email, id: issuer };
  });
};

export const authenticated = fastifyPlugin(authenticatedPlugin);

const signInRequiredPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", async (req, reply) => {
    switch (req.authentication) {
      case Expired:
      case NoAuth: {
        reply.code(401);
        return reply.send();
      }
      case AuthError: {
        reply.code(500);
        return reply.send();
      }
      default: {
        return;
      }
    }
  });
};

export const signInRequired = fastifyPlugin(signInRequiredPlugin);
