'use strict'

class Endpoint {

    constructor(name) {
        this._name = name
        this._path = '/cloudfoundryapplication/' + (name ? name + '/' : '')
    }

    getName() {
        return this._name
    }

    getPath() {
        return this._path
    }

    handle(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'authorization')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
    }
}

module.exports = Endpoint