import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { serverPort } from "../env";

export async function createServer() {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "..", "public"),
    wildcard: false,
    preCompressed: true,
  });
  fastify.get("/*", (req, reply) => {
    reply.sendFile("index.html");
  });

  const run = async () => {
    try {
      await fastify.listen(serverPort, "0.0.0.0");
    } catch (err) {
      fastify.log.error(err);
    }
  };

  return { run };
}
