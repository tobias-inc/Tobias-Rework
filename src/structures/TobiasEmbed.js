const { MessageEmbed } = require('discord.js')
const Constants = require('../utils/Constants')

module.exports = class TobiasEmbed extends MessageEmbed {
  constructor (user) {
    super({})
    this.setColor(Constants.EMBED_COLOR)
    this.setTimestamp()
    if (user) this.setFooter(user.username, user.displayAvatarURL())
  }
}