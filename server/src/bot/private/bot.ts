import { Client, Intents, DiscordAPIError } from "discord.js";
import Fuse from "fuse.js";

import { cards } from "../../cardCollection/cards.js";
import { discordBotToken } from "../../env.js";
import { registerCommands, cardCommand } from "./commands.js";

const imagesByCardName = new Map(cards.map(({ name, image }) => [name, image]));
const cardNames = Array.from(imagesByCardName.keys());
const fuse = new Fuse(cardNames, {
  isCaseSensitive: false,
  includeScore: true,
  ignoreLocation: true,
});

const list = new Intl.ListFormat("en", { style: "long", type: "disjunction" });

export async function startBot() {
  console.log("BOT: init start");

  console.log("BOT: register commands");
  await registerCommands();

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  console.log("BOT: setup interactions");
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== cardCommand.name) return;

    const query = cardCommand.cardName(interaction);
    if (!query) return;

    const result = fuse.search(query, { limit: 3 });
    try {
      if (result.length === 0) {
        return interaction.reply({
          ephemeral: true,
          content: `I am sorry, my darling, but I have no idea what you are looking for 🤷‍♂️`,
        });
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

      const candidates = result.map(({ item }) => `\`${item}\``);
      return interaction.reply({
        ephemeral: true,
        content: `I'm not sure I follow you. Are you maybe asking about ${list.format(
          candidates
        )}?`,
      });
    } catch (e) {
      if (e instanceof DiscordAPIError) {
        return;
      }
      throw e;
    }
  });

  console.log("BOT: login");
  await client.login(discordBotToken);
  console.log("BOT: init done");
}
