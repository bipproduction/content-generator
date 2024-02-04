const Emiter = require('events')

const evnKerjakan = new Emiter()

/**
 * @typedef {"kerjakan" | "satu" | "dua" | "kerjakan_close"} Evn
 */

/**
 * 
 * @param {Evn} evn 
 * @param {string} text 
 */
function emit(evn, text) {
    evnKerjakan.emit(evn, text)
}

/**
 * 
 * @param {Evn} evn 
 */
function listen(evn, callback) {
    evnKerjakan.on(evn, callback)
}

module.exports = {
    emit,
    listen
}
