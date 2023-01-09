const Telegraf = require('telegraf')
const { Extra, Markup } = Telegraf
const Scene = require('telegraf/scenes/base')
const UserStorage = require('../../storage/mongo/user')
const config = require('../../config/index')
const home_keyboards = require('../keyboards/home')
const { home_message } = require('../../helper/constants')
const incupsulationUserInfo = require('../../helper/setUserInfoToUrl')
const fs = require('fs')
const path = require('path')

class HomeScene {
    Home () {
        const home = new Scene('home');
        
        home.enter(async (ctx) => { 
            const chat_id = ctx.message ? ctx.message.chat.id : ctx.chat.id

            const user = await UserStorage.FindUser({ chat_id })
            if(!user) {
                await ctx.scene.enter('phone')
            }

            const keys_with_info = await incupsulationUserInfo(home_keyboards[user.choosen_lang], chat_id)

            await ctx.reply(
                home_message[user.choosen_lang], 
                Markup
                    .keyboard(keys_with_info)
                    .oneTime()
                    .resize()
                    .extra()
            )
        })
        home.on('text', async ctx => {
            const chat_id = ctx.message.chat.id
            const msg = ctx.message.text

            const user = await UserStorage.FindUser({ chat_id })
            if(!user) {
                await ctx.scene.enter('phone')
            }

            const lang = home_keyboards[user.choosen_lang]

            if(msg == lang[0][0]['text']) {
                await ctx.scene.enter('request_application')
                return
            } else if (msg == lang[7][0]['text']) { // go to LanguageScene
                await ctx.scene.enter('lang')
                return
            } else if (msg == lang[5][0]['text']) {

                const file_path = path.join(process.cwd(), 'files', `${user.choosen_lang}_price_list.PDF`)
                const docs = fs.readFileSync(file_path)
              
                await ctx.replyWithDocument({ source: docs, filename: `${user.choosen_lang}_price_list.PDF` })
                return
            }
        })
        return home
    }
}

module.exports = HomeScene