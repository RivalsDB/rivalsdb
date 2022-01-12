import { createServer } from "./server/server.js";
import { createBot } from "./bot/index.js";
import { runBotServer } from "./env.js";
import { Service } from "./typings/Service.js";

const noopService: Service = {
  async run() {},
  async shutdown() {},
};

Promise.all([createServer(), runBotServer ? createBot() : noopService]).then(
  ([server, bot]) => {
    server.run();
    bot.run();

    const shutdown = () => {
      server.shutdown();
      bot.shutdown();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    process.on("SIGQUIT", shutdown);
  }
);
