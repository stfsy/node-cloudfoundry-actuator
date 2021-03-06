'use strict'

/**
 * 
 */
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

    /**
     * 
     * @returns {string} name of this endpoint
     */
    getName() {
        return this._name
    }

    /**
     * 
     * @returns {string} registered path of this endpoint
     */
    getPath() {
        return this._path
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     * @returns {Promise} promise
     */
    handleRequest(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', this._allowHeaders)
        res.setHeader('Access-Control-Allow-Methods', this._allowMethods)

        return this._handle(req, res)
    }

    
    /**
     * 
     * @abstract
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     * @returns {Promise} promise
     */
    _handle(req, res) {
        return Promise.resolve()
    }
}

module.exports = Endpoint