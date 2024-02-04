const makuro_config = require('../../makuro_config')
const crp = new (require('cryptr'))(makuro_config.key)
module.exports = async function () {
    const { ChatGPTAPI } = (await import("chatgpt"))
    const api = new ChatGPTAPI({
        apiKey: crp.decrypt(makuro_config.gpt_key)
    })

    return api
}