import { FastifyPluginAsync } from "fastify";
import { fetchHallOfFame } from "../entity/tournament.js";

const indexV2: FastifyPluginAsync = async (fastify) => {
  fastify.get("/tournaments", {
    async handler() {
      const hall = await fetchHallOfFame();
      return hall;
    },
  });
};

export const v2Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(indexV2);
};
