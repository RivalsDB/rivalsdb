import "source-map-support/register";

import { createServer } from "./server";
import { startBot } from "./bot";

startBot()
  .catch((e) => console.log(e))
  .then(() => createServer())
  .then(({ run }) => run());
