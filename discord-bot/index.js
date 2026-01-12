import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const WEBHOOK = process.env.N8N_WEBHOOK_URL;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    await axios.post(WEBHOOK, {
      content: message.content,
      author: message.author.username,
      channelId: message.channel.id,
      userId: message.author.id
    });
  } catch (err) {
    console.error("Failed to send to n8n:", err.message);
  }
});

client.login(process.env.BOT_TOKEN);