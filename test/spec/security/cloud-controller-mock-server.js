'use strict'

const jwt = require('jsonwebtoken')
const resolve = require('path').resolve
const fs = require('fs')
const publicKey = fs.readFileSync(resolve('test/spec/security/verifying_key.pem'), {
    encoding: 'utf-8'
})
const express = require('express')
const app = express()

const port = process.env.PORT || 5123

// token keys
app.get('/token_keys', (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200).send(JSON.stringify({
        "keys": [{
            "kty": "RSA",
            "e": "AQAB",
            "use": "sig",
            "kid": "key-1",
            "alg": "RS256",
            "value": publicKey,
            "n": "AMcWv4ogKaz625PU5cnCEJSZHZ0pXLumxrzHMSVLLOrHugnJ8nUlnI7NOiP1PlJ9Mirf3pqBsclZV9imE1qG9n_u4xeofF_5kf0EvWCT1jqQKdszlHrSB_CPJbX91A-M7Of03f3jN3YUmgUfB2r1CzTAG6CylQtlU1HGru96r9_P"
        }]
    }))
})

// cloud controller info
app.get('/info', (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200).send(JSON.stringify({
        "name": "pcfdev",
        "build": "4af54097fef22734d857410ddfb89ee979087911",
        "support": "pcfdev@pivotal.io",
        "version": 0,
        "description": "",
        "authorization_endpoint": "http:// + req.get('host')",
        "token_endpoint": "http://" + req.get('host'),
        "allow_debug": true
    }))
})

// uaa permission
app.get('/v2/apps/my-application-id/permissions', (req, res) => {
    const bearer = req.header('authorization')

    if (!bearer) {
        res.status(401).send()
        return
    }
    const token = bearer.replace('Bearer ', '')

    if (!token) {
        res.status(401).send()
    }
    const decodedToken = jwt.verify(token, publicKey, { algorithm: 'RS256'})

    res.setHeader('content-type', 'application/json')
    res.status(200).send(JSON.stringify({
        "read_sensitive_data": true,
        "read_basic_data": true
    }))
})

module.exports = app.listen(port)