'use strict'

const jsonwebtoken = require('jsonwebtoken')
const keypair = require('keypair');
const pair = keypair();
const notMatchingPrivateKey = keypair().private

class UaaMockTokenProvider {

    createValidToken() {
        return this._sign(this._payload({}))
    }

    createInvalidToken() {
        return this._sign(this._payload({}), this._header({}), notMatchingPrivateKey)
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

    publicKey() {
        return pair.public
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

    _sign(payload, header = this._header({}), key = pair.private) {
        return jsonwebtoken.sign(payload, key, {
            algorithm: 'RS256',
            header
        })
    }
}

module.exports = new UaaMockTokenProvider()