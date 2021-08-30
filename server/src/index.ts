import "source-map-support/register";

import { createServer } from "./server/server";
import { startBot } from "./bot";

createServer().then(({ run }) => {
  return Promise.all([
    run().then(() => console.log("Server is running")),
    startBot().then(() => console.log("Bot is running")),
  ]);
});
