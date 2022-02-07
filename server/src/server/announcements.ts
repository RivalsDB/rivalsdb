import { FastifyPluginAsync } from "fastify";
import { fetchPublishedAnnoncements } from "../db/index.js";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/announcements", {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              announcementId: { type: "integer" },
              markdown: { type: "string" },
              publishedAt: { type: "integer" },
            },
          },
        },
      },
    },
    async handler() {
      const announcements = await fetchPublishedAnnoncements();
      return announcements;
    },
  });
};

export default routes;
