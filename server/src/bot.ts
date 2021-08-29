import { Client, Intents } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";
import { cards } from "./cards";
import Fuse from "fuse.js";

const clientId = process.env.DISCORD_CLIENT_ID!;
const token = process.env.DISCORD_BOT_TOKEN!;

const commands = [
  new SlashCommandBuilder()
    .setName("card")
    .setDescription("Replies with the card you're looking for")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The card name or a part of it")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

export async function startBot() {
  const rest = new REST({ version: "9" }).setToken(token);
  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "card") {
      const query = interaction.options.getString("name");
      if (!query) return;
      const cardImage = findCard(query);
      await interaction.reply(cardImage);
    }
  });

  await client.login(token);
}

const colCards = new Map(cards.map(({ name, image }) => [name, image]));
const cardNames = Array.from(colCards.keys());
const fuse = new Fuse(cardNames, {
  isCaseSensitive: false,
  includeScore: true,
});
function findCard(string: string): string {
  console.log("checking", fuse.search(string));
  return "11";
}
