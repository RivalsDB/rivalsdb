import "source-map-support/register";

import { createServer } from "./server/server";
import { startBot } from "./bot";

startBot()
  .then(() => createServer())
  .then(({ run }) => run());
