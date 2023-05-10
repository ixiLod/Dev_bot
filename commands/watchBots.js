const { SlashCommandBuilder } = require('discord.js');
const { botID } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('watchbots')
    .setDescription('Show watched bots'),

  async execute(interaction) {
    const botUsernames = botID
      .map((id) => interaction.guild.members.cache.find((member) => member.id === id))
      .filter((member) => member !== undefined)
      .map((member) => member.user.username)
      .join(', ');

    if (botUsernames) {
      await interaction.reply({
        content: `Already watching ${botUsernames}`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `No bots are being watched at the moment.`,
        ephemeral: true,
      });
    }
  },
};
