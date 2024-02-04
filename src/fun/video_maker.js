const videoshow = require('videoshow');
const path = require('path');
const fs = require('fs')

module.exports = async function ({ log = false, loop = 15 } = {}
) {
    try {
        var videoOptions = {
            fps: 25,
            loop, // seconds
            transition: true,
            transitionDuration: 1, // seconds
            videoBitrate: 1024,
            videoCodec: 'libx264',
            size: '640x?',
            audioBitrate: '128k',
            audioChannels: 2,
            format: 'mp4',
            pixelFormat: 'yuv420p'
        };

        try {
            await fs.promises.access(path.join(__dirname, './../../assets/out'))
        } catch (error) {
            await fs.promises.mkdir(path.join(__dirname, './../../assets/out'))
        }

        await new Promise((resolve, reject) => {
            videoshow([path.join(__dirname, "./../../assets/png/gambar.png")], videoOptions)
                .audio(path.join(__dirname, './../../assets/mp3/song.mp3'))
                .save(path.join(__dirname, './../../assets/out/video.mp4'))
                .on('error', function (err, stdout, stderr) {
                    log && console.error('Error:', err);
                    log && console.error('ffmpeg stderr:', stderr);
                    reject(err); // Tambahkan penolakan promise jika terjadi kesalahan
                })
                .on('end', function (output) {
                    log && console.log('Video created in:', output);
                    resolve(true);
                });
        });

        return {
            success: true
        }

    } catch (error) {
        log && console.error("Terjadi kesalahan:", error);
        // Handle error sesuai kebutuhan Anda
        return {
            success: false,
            message: error.message
        }
    }
};
