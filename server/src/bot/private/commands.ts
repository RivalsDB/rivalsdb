import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";

import { discordBotToken, discordClientId } from "../../env.js";

export const cardCommand = {
  name: "card",
  cardName(interaction: CommandInteraction): string | null {
    return interaction.options.getString("name");
  },
} as const;

const card = new SlashCommandBuilder()
  .setName(cardCommand.name)
  .setDescription("Replies with the card you're looking for")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the card or a part of it's name")
      .setRequired(true)
  );

export async function registerCommands(): Promise<unknown> {
  const rest = new REST({ version: "9" }).setToken(discordBotToken);
  const body = [card].map((command) => command.toJSON());
  return rest.put(Routes.applicationCommands(discordClientId), { body });
}
