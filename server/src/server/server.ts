import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyStatic from "fastify-static";
import fastifyCompress from "fastify-compress";
import path from "path";
import { serverPort } from "../env.js";
import { closeDbPool } from "../db/index.js";
import cardsRoutes from "./cards.js";
import decklistsRoutes from "./decklists.js";
import usersRoutes from "./users.js";
import { Service } from "../typings/Service.js";

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

export async function createServer(): Promise<Service> {
  console.log("SERVER: init start");
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyCors);
  fastify.register(fastifyCompress);

  fastify.register(decklistsRoutes, { prefix: "/api/v1" });
  fastify.register(cardsRoutes, { prefix: "/api/v1" });
  fastify.register(usersRoutes, { prefix: "/api/v1" });

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

  fastify.addHook("onClose", closeDbPool);

  console.log("SERVER: init done");
  return {
    async run() {
      try {
        await fastify.listen(serverPort, "0.0.0.0");
      } catch (err) {
        fastify.log.error(err);
      }
      console.log("SERVER: listening");
    },
    async shutdown() {
      console.log("SERVER: shutdown start");
      await fastify.close();
      console.log("SERVER: shutdown done");
    },
  };
}
