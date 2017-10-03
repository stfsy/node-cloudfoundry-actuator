'use strict'

const express = require('express')
const app = express()

const actuator = require('./index')

const port = process.env.PORT || 3000

app.use(actuator())
app.get('/**', (req, res) => {
    res.status(200).send('Hello world')
})

app.listen(port, () => {
    console.log('Here we go!!')
    console.log('Running on port ' + port)
})