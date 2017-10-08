'use strict'

const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const resolve = require('path').resolve
const publicKey = fs.readFileSync(resolve('test/spec/security/verifying_key.pem'), {
    encoding: 'utf-8'
})

const privateKey = fs.readFileSync(resolve('test/spec/security/signing_key.pem'), {
    encoding: 'utf-8'
})

class UaaMockTokenProvider {

    createValidToken() {
        return this._sign(this._payload({}))
    }

    createInvalidToken() {
        return this._sign(this._payload({}), this._header({}), privateKey.replace('z', 'y'))
    }

    createTokenWithInvalidIssuer() {
        return this._sign(this._payload({
            iss: 'abc'
        }))
    }

    createTokenWithInvalidKeyIdentifier() {
        return this._sign(this._payload({}), this._header({kid: '12'}))
    }

    createExpiredToken() {
        return this._sign(this._payload({
            iat: Math.floor(Date.now() / 1000) - 60,
            exp: Math.floor(Date.now() / 1000) - 30,
        }), this._header({

        }))
    }

    _payload({
        iat = Math.floor(Date.now() / 1000) - 30,
        exp = Math.floor(Date.now() / 1000) + 30,
        iss = 'http://localhost:5123/oauth/token'
    }) {
        return {
            iat,
            exp,
            iss
        }
    }

    _header({
        kid = 'key-1',
        alg = 'RS256',
    }) {
        return {
            kid,
            alg
        }
    }

    _sign(payload, header = this._header({}), key = privateKey) {
        return jsonwebtoken.sign(payload, key, {
            algorithm: 'RS256',
            header
        })
    }
}

module.exports = new UaaMockTokenProvider()