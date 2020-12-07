const { MessageEmbed } = require('discord.js');
const Constants = require('../utils/Constants');

module.exports =  class TobiasEmbed extends MessageEmbed  {
  constructor (user) {
    super({})
    this.setTimestamp()
    this.setColor(Constants.EMBED_COLOR)
    if (user) this.setFooter(user.username, user.displayAvatarURL())
  }
}