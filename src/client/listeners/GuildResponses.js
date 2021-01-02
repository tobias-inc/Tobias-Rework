module.exports = class GuildResponses {
  constructor (client) {
    this.client = client
    this.events = ['guildMemberAdd', 'guildMemberRemove', 'raw']
  }

  async onGuildMemberAdd (member) {
    const guild = this.client.guilds.resolve('500452776770535444').members.cache.size.toString().split('') 
    const contador = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let count = ''
    for (let i = 0; i < guild.length; i++) { count += ':' + contador[guild[i]] + ':' }
    const canal = this.client.guilds.resolve('500452776770535444').channels.resolve('671400534535700512')
    canal.setTopic(`Temos atualmente ${count} TobiasMunistas`)

    const MsgChannel = guild.channels.cache.get('789198900233895937')
    MsgChannel.send(`Seja bem vindo ao Hotel Tobias, ${member.username}, espero que tenha uma otima estadia! \n
    Dê uma olhada em nosso #faq e seja bastante ativo em nosso chat #geral`)
    
  }

  async onGuildMemberRemove () {
    const guild = this.client.guilds.resolve('500452776770535444').members.cache.size.toString().split('')
    const contador = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let count = ''
    for (let i = 0; i < guild.length; i++) { count += ':' + contador[guild[i]] + ':' }
    const canal = this.client.guilds.resolve('500452776770535444').channels.resolve('671400534535700512')
    canal.setTopic(`Temos atualmente ${count} TobiasMunistas`)
  }

  async onRaw (dados) {
    if (dados.t !== 'MESSAGE_REACTION_ADD' && dados.t !== 'MESSAGE_REACTION_REMOVE') return
    if (dados.d.message_id != '705817634809053194') return

    const servidor = this.client.guilds.resolve('500452776770535444')
    const membro = await servidor.members.fetch(dados.d.user_id)
    const cargo = await servidor.roles.fetch('671400506245120030')

    if (dados.t === 'MESSAGE_REACTION_ADD') {
      if (dados.d.emoji.id == '547392151043178506') {
        if (membro.roles.cache.get(cargo)) return
        membro.roles.add(cargo)
      }
    }
    if (dados.t === 'MESSAGE_REACTION_REMOVE') {
      if (dados.d.emoji.id === '547392151043178506') {
        if (membro.roles.cache.get(cargo)) return
        membro.roles.remove(cargo)
      }
    }
  }
}