function getTodayColor() {
    const days = [
        { "hari": "senin", "background": "#3498db", "text": "#ffffff" },
        { "hari": "selasa", "background": "#2ecc71", "text": "#ffffff" },
        { "hari": "rabu", "background": "#e74c3c", "text": "#ffffff" },
        { "hari": "kamis", "background": "#f39c12", "text": "#ffffff" },
        { "hari": "jumat", "background": "#9b59b6", "text": "#ffffff" },
        { "hari": "sabtu", "background": "#1abc9c", "text": "#ffffff" },
        { "hari": "minggu", "background": "#e67e22", "text": "#ffffff" }
    ];

    const today = new Date().getDay(); // Mendapatkan angka yang merepresentasikan hari saat ini (0 untuk Minggu, 1 untuk Senin, dst.)

    // Mencari warna yang sesuai dengan hari ini dalam daftar
    const todayColor = days.find(day => day.hari.toLowerCase() === getDayName(today));

    return todayColor || null;
}

function getDayName(dayIndex) {
    const daysOfWeek = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
    return daysOfWeek[dayIndex];
}