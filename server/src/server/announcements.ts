import { FastifyPluginAsync } from "fastify";
import { fetchAllPublished, toTransferObject } from "../entity/announcement.js";

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
      const announcements = await fetchAllPublished();
      return announcements.map(toTransferObject);
    },
  });
};

export default routes;
