import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { serverPort } from "../env.js";
import { db } from "../db/index.js";
import { routes } from "./api.js";

const dirname = new URL(import.meta.url).pathname;
const publicFolder = path.join(dirname, "..", "..", "..", "public");

export async function createServer() {
  const fastify = Fastify({ logger: true });

  fastify.register(routes);

  fastify.register(fastifyStatic, {
    root: publicFolder,
    wildcard: false,
    preCompressed: true,
  });
  fastify.get("/*", (req, reply) => {
    reply.sendFile("index.html");
  });

  return {
    async run() {
      try {
        await fastify.listen(serverPort, "0.0.0.0");
      } catch (err) {
        fastify.log.error(err);
      }
    },

    async shutdown() {
      return db.dispose();
    },
  };
}
