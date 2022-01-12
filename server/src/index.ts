import { createServer } from "./server/server.js";
import { startBot } from "./bot/index.js";
import { runBotServer } from "./env.js";

createServer().then(async ({ run, shutdown }) => {
  await run();

  if (runBotServer) {
    await startBot();
    console.log("Bot is running");
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("SIGQUIT", shutdown);
});
