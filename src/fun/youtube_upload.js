const { upload } = require('youtube-videos-uploader');
const path = require('path');
const makuro_config = require('../../makuro_config');
const crp = new (require('cryptr'))(makuro_config.key)

module.exports = async function ({ content = {
    title: "default title",
    desc: "default des"
},
    log = false } = {}) {

    const up = (await import('log-update')).default
    const youtube_upload = await upload({
        email: crp.decrypt(makuro_config.email),
        pass: crp.decrypt(makuro_config.password),
    }, [
        {
            path: path.join(__dirname, "./../../assets/out/video.mp4"),
            title: content.title,
            description: content.desc,
            onSuccess: (v) => {
                log && console.log("success", v)
            }, skipProcessingWait: true,
            onProgress: (progress) => {
                log && up(progress)
            },
            uploadAsDraft: false,
            isAgeRestriction: false,
            isNotForKid: true,
            publishType: 'PUBLIC',
            isChannelMonetized: false,

        }
    ], { headless: "chrome", args: ['--no-sandbox'] })

    console.log("Upload Success")
    return youtube_upload
}