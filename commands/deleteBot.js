const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { botID } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deletebot')
    .setDescription('Remove all customs bots')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    botID.splice(2, botID.length);
    await interaction.reply({
      content: `All customs bots are removed`,
      ephemeral: true,
    });
  },
};
