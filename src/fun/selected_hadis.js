const _ = require('lodash')
const prisma = new (require('@prisma/client')).PrismaClient()

module.exports = async function funSelectHadis({ urutan, log } = {
    urutan: 0,
    log: false
}) {
    try {
        // Select satu hadis secara acak
        const list_hadis = await prisma.hadis.findMany({
            select: {
                id: true,
            },
        });

        if (_.isEmpty(list_hadis)) {
            throw new Error("tidak bisa mendapatkan data karena data pada tabel kosong , isi terlebih dahulu")
        }

        // Mengecek apakah hadis pernah di-publish
        log && console.log("engecek apakah hadis pernah di-publish")
        const checkPublished = await prisma.hadisPublished.findUnique({
            where: {
                id: list_hadis[urutan]?.id,
            },
        });

        // Mendapatkan total count data kedua tabel untuk dibandingkan
        const [hadisCount, publishedCount] = await Promise.all([
            prisma.hadis.count(),
            prisma.hadisPublished.count(),
        ]);

        // Jika pernah di-publish atau hadis tidak lebih banyak dari yang sudah di-publish, kembali mencari ulang
        if (checkPublished || hadisCount <= publishedCount) {
            return funSelectHadis(urutan + 1, prisma);
        }

        const result = await prisma.hadis.findUnique({ where: { id: list_hadis[urutan].id } })
        return result;
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        // Handle error sesuai kebutuhan Anda
        throw error; // Re-throw error untuk menangani di lapisan panggilan lebih tinggi
    }
}