const screen_shot = require("./screen_shot")
const video_maker = require("./video_maker")
const { fetch } = require('cross-fetch')
const youtube_upload = require("./youtube_upload")
const get_hadis = require("./get_hadis")


module.exports = async function ({ log = "", url = "http://localhost:3000" } = {}) {

    try {
        log += "mengambil data content \n"
        const text = await get_hadis()
        if (!text.text) throw new Error("text kosong")

        log += "megambil screenshoot \n"
        await screen_shot({
            url,
            content: text.text,
            headless: "new"
        })

        log += "membuat video \n"
        await video_maker()

        const content = {
            title: text.text,
            desc: text.text
        }

        log += "upload content \n"


        const y_up = await youtube_upload({
            content
        })

        await fetch(`https://wa.wibudev.com/code?text=youtube success \n${y_up.join(" ")} \ncontent: ${text.text}&nom=6289697338821`)

        return log
    } catch (error) {
        log += "error \n"
        log += error.message
        await fetch(`https://wa.wibudev.com/code?text=${error.message}&nom=6289697338821`)
        return log
    }
}