const express = require('express')
const app = express()
const path = require('path')
const _ = require('lodash')
// const fs = require("fs")
// const selected_hadis = require('../fun/_selected_hadis')
// const get_hadis = require('../fun/get_hadis')
const kerjakan = require('../fun/kerjakan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./public")))


module.exports = async function () {


    // app.get("/hadis", async (req, res) => {
    //     const hadis = await get_hadis(api)
    //     res.json(hadis)
    // })

    // app.get('/hadis-selected', async (req, res) => {
    //     const data = await selected_hadis()
    //     res.send(data)
    // })

    // app.get("/tips-js", async (req, res) => {
    //     const text = await api.sendMessage("pilih satu package secara random yang kamu ketahui dari npm lalu jelaskan dan berikan contohnya")
    //     res.send(text.text)
    // })

    app.get('/generator', (req, res) => {
        return res.sendFile(path.join(__dirname, "./public/generator.html"))
    })

    app.get('/kerjakan-hadis', async (req, res) => {

        // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
        const url = `${req.protocol}://${req.get("host")}`
        res.setHeader('Content-Type', 'text/plain');
        const ker = await kerjakan({
            url
        })

        res.send(ker)

    })

    return app
}

