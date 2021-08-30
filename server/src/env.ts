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

if (typeof process.env.PORT !== "string") {
  throw Error("Missing environment variable PORT");
}
export const serverPort = process.env.PORT;

console.log("SETUP! HOST", process.env.HOST);
