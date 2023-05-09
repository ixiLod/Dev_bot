const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { botID } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addbot')
    .setDescription("For add a new bot to check if it's online or not")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option.setName('id').setDescription('The ID of the bot you want to add').setRequired(true)
    ),

  async execute(interaction) {
    member = interaction.guild.members.cache.get(interaction.options.getString('id'));
    botID.push(interaction.options.getString('id'));
    await interaction.reply({
      content: `${member.user.username} is added`,
      ephemeral: true,
    });
  },
};
