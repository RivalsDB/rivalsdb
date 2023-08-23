const env = process.env;

export const isProduction = env.NODE_ENV === "production";

if (typeof env.DISCORD_CLIENT_ID !== "string") {
  throw Error("Missing environment variable DISCORD_CLIENT_ID");
}
export const discordClientId = env.DISCORD_CLIENT_ID;

if (typeof env.DISCORD_BOT_TOKEN !== "string") {
  throw Error("Missing environment variable DISCORD_BOT_TOKEN");
}
export const discordBotToken = env.DISCORD_BOT_TOKEN;

const parsedPort = typeof env.PORT === "string" ? parseInt(env.PORT, 10) : NaN;
if (isNaN(parsedPort)) {
  throw Error("Missing environment variable PORT");
}
export const serverPort = parsedPort;

// in production, Railway provides an environment variable without protocol prefix here, so we need to add HTTPS.
// for local development, we want to set a fully formed URL for this env-var, i.e. http://localhost:3000
export const baseUrl = env.RAILWAY_STATIC_URL?.match(/^https?:\/\//) ? new URL(`${env.RAILWAY_STATIC_URL}`) : new URL(`https://${env.RAILWAY_STATIC_URL}`);

if (typeof env.RUN_BOT_SERVER !== "string") {
  throw Error("Missing environment variable RUN_BOT_SERVER");
}
export const runBotServer = env.RUN_BOT_SERVER === "1";

if (typeof env.DATABASE_URL !== "string") {
  throw Error("Missing environment variable DATABASE_URL");
}
export const databaseUrl = env.DATABASE_URL;

export const sentryDsn =
  typeof env.SENTRY_DSN === "string" ? env.SENTRY_DSN : undefined;

if (typeof env.ENVIRONMENT !== "string") {
  throw Error("Missing environment variable ENVIRONMENT");
}
export const environment = env.ENVIRONMENT;
