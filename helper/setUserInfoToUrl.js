const UserStorage = require('../storage/mongo/user')

const incupsulationUserInfo = async (keyboards, chat_id) => {

    const user = await UserStorage.FindUser({ chat_id }) 

    if(!user) {
        return false
    } 

    for(let i of keyboards) {
        const btn = i[0]

        if(btn.web_app) {
            btn.web_app.url += `&lang=${user.choosen_lang}&number=${user.phone}&name=${user.full_name.trim().replace(' ', '-')}`
        }
    }

    return keyboards
}


module.exports = incupsulationUserInfo