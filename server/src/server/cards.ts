import { FastifyPluginAsync } from "fastify";
import { cards } from "../cardCollection/cards.js";

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/cards", {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              attackType: { type: "array", items: { type: "string" } },
              attributeMental: { type: "integer" },
              attributePhysical: { type: "integer" },
              attributeSocial: { type: "integer" },
              bloodPotency: { type: "integer" },
              clan: { type: "string" },
              disciplines: { type: "array", items: { type: "string" } },
              flavor: { type: "string" },
              id: { type: "string" },
              illustrator: { type: "string" },
              image: { type: "string" },
              name: { type: "string" },
              set: { type: "string" },
              text: { type: "string" },
              types: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
    },
    async handler() {
      return cards;
    },
  });
};

export default routes;
