const { Command, TobiasEmbed, Constants } = require('../../')

module.exports = class ConfigPrefix extends Command {
    constructor(client, path) {
        super(client, path, {
            name: 'language',
            category: 'configuration',
            aliases: ['setlanguage', 'lingua', 'idioma'],
            utils: {
                requirements: {
                    guildOnly: true,
                    databaseOnly: true,
                    permissions: ['MANAGE_GUILD']
                }
            }
        })
    }

    async run({ t, author, channel, guild }, language = Constants.DEFAULT_LANGUAGE) {
        const embed = new TobiasEmbed(author)
        try {
            await this.client.database.guilds.update(guild.id, { $set: { language }}) 
            embed.setTitle(
                t('commands:config.subcommands.language.changedSuccessfully', { language })
            )
        } catch (e) {
            embed.setColor(Constants.ERROR_COLOR).setDescription(t('errors:generic'))
        }
        channel.send(embed)
    }
}