const moment = require('moment')
const { Command, TobiasEmbed } = require('../..')

module.exports = class ServerInfo extends Command {
  constructor (client, path) {
    super(client, path, {
      name: 'serverinfo',
      category: 'utility',
      aliases: ['si', 'sinfo', 'serveri']
    })
  }

  async run ({ channel, language, t, author, guild }) {
    const embed = new TobiasEmbed(author)

    channel.send(
      embed
        .addField(t('commands:serverinfo.name'), guild.name, true)
        .addField(
          t('commands:serverinfo.verify.ctx'),
          t(`commands:serverinfo.verify.level.${guild.verificationLevel}`),
          true
        )
        .addField(
          t('commands:serverinfo.createdAt'),
          await this.time(guild.createdAt, language),
          false
        )
        .addField(t('commands:serverinfo.owner'), guild.owner.user.tag, true)
        .addField(
          t('commands:serverinfo.channels.ctx', {
            length: guild.channels.cache.size
          }),
          await this.channels(guild, t),
          true
        )
        .addField(
          t('commands:serverinfo.members.ctx', {
            size: guild.memberCount
          }),
          await this.members(guild, t),
          true
        )
        .addField(
          t('commands:serverinfo.role.ctx', {
            length: guild.roles.cache.size - 1
          }),
          await this.roles(guild, t),
          false
        )
    )
  }

  channels (guild, t) {
    const category = `**${
      guild.channels.cache.filter(c => c.type === 'category').size
    }**`
    const voice = `**${
      guild.channels.cache.filter(c => c.type === 'voice').size
  }**`
    const text = `**${
      guild.channels.cache.filter(c => c.type === 'text').size
    }**`
    return [
      t('commands:serverinfo.channels.category') + category,
      t('commands:serverinfo.channels.text') + text,
      t('commands:serverinfo.channels.voice') + voice
    ].join('\n')
  }

  members (guild, t) {
    const users = `**${
      guild.memberCount - guild.members.cache.filter(u => !u.user.bot).size
    }**`
    const bots = `**${
      guild.members.cache.filter(u => u.user.bot).size
    }**`
    return [
      t('commands:serverinfo.members.users') + users,
      t('commands:serverinfo.members.bots') + bots
    ].join('\n')
  }

  roles (guild, t) {
    const roles = guild.roles.cache.map(role => role).slice(1)
    const managed = guild.roles.cache.filter(role => role.managed)
    if (!roles.length) return t('commands:serverinfo.role.noTags')
    return [
      t('commands:serverinfo.role.managed') +
        `**${managed.size}**`,
      roles.length > 10
        ? roles
          .map(r => r)
          .slice(0, 10)
          .join(', ') +
          ` ${t('commands:serverinfo.role.tags', {
            length: roles.length - 10
          })}`
        : roles.map(r => r).join(', ')
    ].join('\n')
  }

  time (ms, language) {
    moment.locale(language)
    return moment(ms).format('LLLL')
  }
}