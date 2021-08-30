import { Client, Intents } from "discord.js";
import Fuse from "fuse.js";
import { format } from "url";

import { cards } from "../../cardCollection/cardCollection";
import { discordBotToken, baseUrl } from "../../env";
import { registerCommands, cardCommand } from "./commands";

const imagesByCardName = new Map(cards.map(({ name, image }) => [name, image]));
const cardNames = Array.from(imagesByCardName.keys());
const fuse = new Fuse(cardNames, {
  isCaseSensitive: false,
  includeScore: true,
  ignoreLocation: true,
});

const list = new Intl.ListFormat("en", { style: "long", type: "disjunction" });

function cardImageUrl(cardImage: string): string {
  return format({
    protocol: "https",
    hostname: baseUrl,
    pathname: `/public/card/${cardImage}`,
  });
}

export async function startBot() {
  await registerCommands();

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  client.on("interactionCreate", async (interaction) => {
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
      return interaction.reply(cardImageUrl(cardImage));
    }

    const [first, second, ...others] = result;
    if (first.score! * 2 <= second.score!) {
      const cardImage = imagesByCardName.get(first.item)!;
      return interaction.reply(cardImageUrl(cardImage));
    }

    const candidates = result.map(({ item }) => `\`${item}\``);
    return interaction.reply(
      `I'm not sure I follow you. Are you maybe asking about ${list.format(
        candidates
      )}?`
    );
  });

  return client.login(discordBotToken);
}
