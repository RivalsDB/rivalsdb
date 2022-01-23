import { FastifyPluginAsync } from "fastify";
import { cards } from "../cardCollection/cards.js";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/cards", {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              agenda: { type: "integer" },
              attackType: { type: "array", items: { type: "string" } },
              attributeMental: { type: "integer" },
              attributePhysical: { type: "integer" },
              attributeSocial: { type: "integer" },
              blood: { type: "integer" },
              bloodPotency: { type: "integer" },
              clan: { type: "string" },
              copies: { type: "integer" },
              disciplines: { type: "array", items: { type: "string" } },
              id: { type: "string" },
              image: { type: "string" },
              name: { type: "string" },
              reactionType: { type: "array", items: { type: "string" } },
              set: { type: "string" },
              stack: { type: "string" },
              text: { type: "string" },
              types: { type: "array", items: { type: "string" } },
              // flavor: { type: "string" },
              // illustrator: { type: "string" },
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
