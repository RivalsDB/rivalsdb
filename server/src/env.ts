import dotenv from "dotenv";

dotenv.config();

if (typeof process.env.DISCORD_CLIENT_ID !== "string") {
  throw Error("Missing environment variable DISCORD_CLIENT_ID");
}
export const discordClientId = process.env.DISCORD_CLIENT_ID;

if (typeof process.env.DISCORD_BOT_TOKEN !== "string") {
  throw Error("Missing environment variable DISCORD_BOT_TOKEN");
}
export const discordBotToken = process.env.DISCORD_BOT_TOKEN;

const port = parseInt(String(process.env.PORT), 10);
if (isNaN(port)) {
  throw Error("Environment variable PORT didn't read as a valid number");
}
export const serverPort = port;
