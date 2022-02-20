import * as Sentry from "@sentry/node";
import { FastifyPluginAsync } from "fastify";
import { environment, sentryDsn } from "./env.js";

Sentry.init({
  dsn: sentryDsn,
  tracesSampleRate: 1.0,
  environment,
  enabled: environment !== "local",
});

export const captureApiErrors: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((err, req, reply) => {
    Sentry.withScope((scope) => {
      scope.setContext("service", { service: "api" });
      scope.setUser({ ip_address: req.ip });
      scope.setTag("path", req.url);
      Sentry.captureException(err);
      reply.send({ error: 500, message: "Internal Server Error" });
    });
  });
};

export const captureBotError = async (err: unknown) => {
  Sentry.withScope((scope) => {
    scope.setContext("service", { service: "bot" });
    Sentry.captureException(err);
  });
};
