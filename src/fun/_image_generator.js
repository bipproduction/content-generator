const path = require('path')
const fs = require('fs')
module.exports = async function () {
    try {
        const Pageres = (await import('pageres')).default
        const buffer = await new Pageres()
            .source('http://localhost:3000', ['1280x720'])
            .run()
        await fs.promises.writeFile(path.join(__dirname, "./../../assets/png/gambar.png"), buffer)

        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}