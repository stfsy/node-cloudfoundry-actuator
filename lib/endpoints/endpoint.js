'use strict'

class Endpoint {

    constructor({
        name,
        allowHeaders = ['authorization'],
        allowMethods = ['GET']
    }) {
        this._name = name
        this._path = '/cloudfoundryapplication/' + (name ? name + '/' : '')
        this._allowHeaders = allowHeaders.join(', ')
        this._allowMethods = allowMethods.join(', ')
    }

    getName() {
        return this._name
    }

    getPath() {
        return this._path
    }

    handle(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', this._allowHeaders)
        res.setHeader('Access-Control-Allow-Methods', this._allowMethods)
    }
}

module.exports = Endpoint