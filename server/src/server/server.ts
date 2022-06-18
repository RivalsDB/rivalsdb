import Fastify, { FastifyPluginAsync } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import path from "path";
import { serverPort } from "../env.js";
import { closeDbPool } from "../db.js";
import { captureApiErrors } from "../monitoring.js";
import cardsRoutes from "./cards.js";
import announcementsRoutes from "./announcements.js";
import {
  v1Routes as decklistV1Routes,
  v2Routes as decklistV2Routes,
} from "./decklists.js";
import {
  v1routes as usersV1Routes,
  v2routes as usersV2Routes,
} from "./users.js";
import { v2Routes as tournamentsV2Routes } from "./tournaments.js";
import { Service } from "../typings/Service.js";
import { authenticated } from "./auth.js";

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
const tempCardImagesFolder = path.join(
  dirname,
  "..",
  "..",
  "..",
  "..",
  "assets",
  "card-temp"
);
const logoFolder = path.join(dirname, "..", "..", "..", "..", "assets", "logo");

const clientDistFolder = path.join(
  dirname,
  "..",
  "..",
  "..",
  "..",
  "client",
  "dist"
);

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authenticated);
  fastify.register(decklistV1Routes, { prefix: "/v1" });
  fastify.register(cardsRoutes, { prefix: "/v1" });
  fastify.register(announcementsRoutes, { prefix: "/v2" });
  fastify.register(usersV1Routes, { prefix: "/v1" });
  fastify.register(usersV2Routes, { prefix: "/v2" });
  fastify.register(decklistV2Routes, { prefix: "/v2" });
  fastify.register(tournamentsV2Routes, { prefix: "/v2" });
};

export async function createServer(): Promise<Service> {
  console.log("SERVER: init start");
  const fastify = Fastify({ logger: true });

  fastify.register(captureApiErrors);
  fastify.register(fastifyCors);
  fastify.register(fastifyCompress);
  fastify.register(api, { prefix: "/api" });
  fastify.register(fastifyStatic, {
    root: cardImagesFolder,
    wildcard: false,
    preCompressed: true,
    prefix: "/card",
    decorateReply: false,
    maxAge: "14d",
    lastModified: false,
  });
  fastify.register(fastifyStatic, {
    root: tempCardImagesFolder,
    wildcard: false,
    preCompressed: true,
    prefix: "/card",
    decorateReply: false,
    maxAge: "2d",
    lastModified: false,
  });
  fastify.register(fastifyStatic, {
    root: logoFolder,
    wildcard: false,
    preCompressed: true,
    prefix: "/logo",
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
        await fastify.listen({ port: serverPort, host: "0.0.0.0" });
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
