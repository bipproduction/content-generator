const yargs = require('yargs');
const app = require('./src/server/app');
const { fetch } = require('cross-fetch')
yargs
    .command(
        "start",
        "start",
        yargs => yargs
            .options({
                "port": {
                    alias: "p",
                    default: 3000
                }
            }),
        funStart
    )
    .command(
        "grab",
        "grab content",
        yargs => yargs,
        funGrabContent
    )
    .recommendCommands()
    .demandCommand(1)
    .parse(process.argv.splice(2))



async function funStart(argv) {
    (await app()).listen(argv.p, () => console.log(`server berjalan di port ${argv.p}`))
}

async function funGrabContent(argv) {
    const hadis = await fetch('http://localhost:3000/hadis').then(v => v.json())
    console.log(hadis)
}