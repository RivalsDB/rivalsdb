import { Client, Intents } from "discord.js";
import Fuse from "fuse.js";

import { cards } from "../../cardCollection/cardCollection";
import { discordBotToken } from "../../env";
import { registerCommands, cardCommand } from "./commands";

const imagesByCardName = new Map(cards.map(({ name, image }) => [name, image]));
const cardNames = Array.from(imagesByCardName.keys());
const fuse = new Fuse(cardNames, {
  isCaseSensitive: false,
  includeScore: true,
  ignoreLocation: true,
});

const list = new Intl.ListFormat("en", { style: "long", type: "disjunction" });

export async function startBot() {
  await registerCommands();

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  client.on("interactionCreate", async (interaction) => {
    console.log("BOT>>", interaction);
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== cardCommand.name) return;

    const query = cardCommand.cardName(interaction);
    if (!query) return;

    const result = fuse.search(query, { limit: 3 });
    if (result.length === 0) {
      return interaction.reply(
        `I am sorry, my darling, but I have no idea what you are talking about ¯\_(ツ)_/¯`
      );
    }

    if (result.length === 1) {
      const cardImage = imagesByCardName.get(result[0].item)!;
      return interaction.reply(cardImage);
    }

    const [first, second, ...others] = result;
    if (first.score! * 2 <= second.score!) {
      const cardImage = imagesByCardName.get(first.item)!;
      return interaction.reply(cardImage);
    }

    const candidates = result.map(({ item }) => item);
    return interaction.reply(
      `I'm not sure I follow you. Are you asking about any of these ${list.format(
        candidates
      )}`
    );
  });

  return client.login(discordBotToken);
}
