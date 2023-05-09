const { botID, userID } = require('../config.json');

// Variable to track if the message has already been sent
let offlineNotificationSent = false;

module.exports = {
  name: 'presenceUpdate',
  async execute(oldPresence, newPresence, client) {
    const members = botID.map((id) => newPresence.guild.members.cache.get(id));
    const validMembers = members.filter((member) => member !== undefined);

    const offlineBots = validMembers.filter(
      (member) => member.presence && member.presence.status === 'offline'
    );
    const onlineBots = validMembers.filter(
      (member) => member.presence && member.presence.status !== 'offline'
    );
    const botUsernames = offlineBots.map((member) => member.user.username);

    // If there are any bots offline and the notification has not been sent yet
    if (offlineBots.length > 0 && offlineNotificationSent === false) {
      const user = await client.users.fetch(userID);
      user.send(`Attention, ${botUsernames} est maintenant hors-ligne.`);

      // Update the variable to indicate that the notification has been sent
      offlineNotificationSent = true;

    } else if (onlineBots.length > 0) {
      // Update the variable to indicate that the bot is back online
      offlineNotificationSent = false;
    }
  },
};
