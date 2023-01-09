const UserStorage = require('../../storage/mongo/user')


const startCommand = async (ctx) => {
    const chat_id = ctx.message.chat.id
    
    const is_exist = await UserStorage.IsRegister({ chat_id })
    if(!is_exist) {
        const full_name = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
        const new_user = await UserStorage.Register({ chat_id, full_name })
      
        await ctx.scene.enter('phone')
    } else {
        await ctx.scene.enter('home')
        return
    }
}

module.exports = startCommand