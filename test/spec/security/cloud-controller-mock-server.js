'use strict'

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
            "value": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHFr+KICms+tuT1OXJwhCUmR2d\nKVy7psa8xzElSyzqx7oJyfJ1JZyOzToj9T5SfTIq396agbHJWVfYphNahvZ/7uMX\nqHxf+ZH9BL1gk9Y6kCnbM5R60gfwjyW1/dQPjOzn9N394zd2FJoFHwdq9Qs0wBug\nspULZVNRxq7veq/fzwIDAQAB\n-----END PUBLIC KEY-----",
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
    res.setHeader('content-type', 'application/json')
    res.status(200).send(JSON.stringify({
        "read_sensitive_data": true,
        "read_basic_data": true
    }))
})

module.exports = app.listen(port)