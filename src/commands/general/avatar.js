const { Command, TobiasEmbed } = require('../../')


module.exports = class Avatar extends Command {
    constructor(client, path) {
        super(client, path, {
            name: 'avatar',
            category: 'utility',
            aliases: ['av', 'foto'],
            utils: {
                requirements: { databaseOnly: true, canvasOnly: true },
                parameters: [
                    { type: 'user', fetchAll: true, required: false, acceptSelf: true }
                ]
            }
        })
    }

    async run({ channel, author }, user = author) {
        const embed = new TobiasEmbed(author, this.client, {
            thumbnail: user.displayAvatarURL()
          })
        return channel.send(`\`${user.tag}\``, embed.setImage(user.displayAvatarURL({ dynamic: true})))
    }
}