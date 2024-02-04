const _ = require('lodash')
const api_ai = require('./api_ai')
const prisma = new (require('@prisma/client')).PrismaClient()


module.exports = async function funGetHadist(log = false) {
    const api = await api_ai()

    // Mengambil hadis terakhir dari database
    log && console.log("Mengambil hadis terakhir dari database")
    const lastHadis = await prisma.hadis.findFirst({
        orderBy: {
            createdAt: 'desc',
        }
    });

    // Menentukan conversationId untuk pertanyaan selanjutnya
    const conversationId = lastHadis?.id || null;
    log && console.log("[ conversationId ]", conversationId)

    // Mengajukan pertanyaan kepada chatgpt
    log && console.log('Mengajukan pertanyaan kepada chatgpt')
    const text = await api.sendMessage("Berikan satu hadis shahih jika memungkinan pilihkan secara acak", {
        // Ikutkan conversationId jika ada
        conversationId
    });

    log && console.log("[hasil chat gpt]", text.text.length)

    // Memeriksa apakah jawaban sudah ada di database
    log && console.log('Memeriksa apakah jawaban sudah ada di database')
    const existingData = await prisma.hadis.findFirst({
        where: {
            text: text.text,
        },
    });

    if (!existingData) {
        // Menyimpan data jika teks belum ada di database
        log && console.log('Menyimpan data jika teks belum ada di database')
        await prisma.hadis.create({
            data: { ..._.omit(text, "detail") },
        });
        return _.omit(text, "detail")
    } else {
        // Mengulang bertanya jika data sudah ada di database
        log && console.log("sudah ada dilulang lagi")
        await new Promise(r => setTimeout(r, 10000))
        return await funGetHadist(api);
    }
}