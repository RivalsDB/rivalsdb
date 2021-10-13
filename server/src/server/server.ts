import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyStatic from "fastify-static";
import path from "path";
import { serverPort } from "../env.js";
import { db } from "../db/index.js";
import cardsRoutes from "./cards.js";
import decklistsRoutes from "./decklists.js";

const dirname = new URL(import.meta.url).pathname;
const cardImagesFolder = path.join(
  dirname,
  "..",
  "..",
  "..",
  "..",
  "assets",
  "card"
);
const clientDistFolder = path.join(
  dirname,
  "..",
  "..",
  "..",
  "..",
  "client",
  "dist"
);

export async function createServer() {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyCors);

  fastify.register(decklistsRoutes, { prefix: "/api/v1" });
  fastify.register(cardsRoutes, { prefix: "/api/v1" });

  fastify.register(fastifyStatic, {
    root: cardImagesFolder,
    wildcard: false,
    preCompressed: true,
    prefix: "/card",
    decorateReply: false,
  });
  fastify.register(fastifyStatic, {
    root: clientDistFolder,
    wildcard: false,
    preCompressed: true,
  });

  fastify.get("/*", (_, reply) => {
    reply.sendFile("index.html");
  });

  fastify.addHook("onClose", async () => {
    return db.dispose();
  });

  return {
    async run() {
      try {
        await fastify.listen(serverPort, "0.0.0.0");
      } catch (err) {
        fastify.log.error(err);
      }
    },
  };
}
