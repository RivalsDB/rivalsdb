import "source-map-support/register";

import { createServer } from "./server/server";
import { startBot } from "./bot";
import { runBotServer } from "./env";

createServer().then(async ({ run }) => {
  await run();
  console.log("Server is running");

  if (runBotServer) {
    await startBot();
    console.log("Bot is running");
  }
});
