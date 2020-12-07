const { Command, Emojis } = require('../../')


module.exports = class Say extends Command {
    constructor(client, path) {
        super(client, path, {
            name: 'say',
            category: 'general',
            aliases: ['falar', 'speak', 'dizer'],
        })
    }

    async run({ channel, t, member, message }) {

        let argsJunto = message.content.split(" ").slice(1).join(' ')

        if (argsJunto[1] == 0) return channel.send(t('commands:say.null', {Emoji: Emojis.Ehmolekkk}))
        if (!message.guild.member(member.id).hasPermission("MANAGE_MESSAGES")) {
            return message.reply(t('commands:say.msg'), {argsJunto});
        }
        channel.send(`${argsJunto}`)
    }
}