import { FastifyPluginAsync } from "fastify";
import { cards as unstructuredCards } from "../cardCollection/cards.js";
import * as structured from "../cardCollection/structuredCards.js";
import * as convert from "../cardCollection/conversion.js";

const allUnstructured = unstructuredCards.concat(
  Object.entries(structured.agendas).map(convert.toUnstructuredAgenda),
  Object.entries(structured.havens).map(convert.toUnstructuredHaven),
  Object.entries(structured.libraries).map(convert.toUnstructuredLibrary),
  Object.entries(structured.factions).map(convert.toUnstructuredFaction)
);

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
            },
          },
        },
      },
    },
    async handler() {
      return allUnstructured;
    },
  });
};

export default routes;
