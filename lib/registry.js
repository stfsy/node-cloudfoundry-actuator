'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const DiscoveryEndpoint = require('./endpoints/discovery')
const HealthEndpoint = require('./endpoints/health')
const InfoEndpoint = require('./endpoints/info')

/**
 * 
 */
class Registry {

    constructor(options) {
        this._endpoints = {}
        this.__addEndpoint(new DiscoveryEndpoint(this._endpoints))
        this.__addEndpoint(new HealthEndpoint())
        this.__addEndpoint(new InfoEndpoint())
    }

    /**
     * 
     * @param {Endpoint} endpoint 
     */
    __addEndpoint(endpoint) {
        this._endpoints[endpoint.getPath()] = endpoint
    }

    /**
     * 
     * @param {http.ClientRequest} req
     * @returns {Endpoint} the endpoint, that is registered to handle the incoming request 
     */
    getEndpoint(req) {
        let path = req.path
        if (!path.endsWith('/')) {
            path += '/'
        }

        log('getEndpoint %s', path)

        return this._endpoints[path]
    }
}

module.exports = Registry