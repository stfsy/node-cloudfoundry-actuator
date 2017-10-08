'use strict'

const log = require('util').debuglog('cloudfoundry-actuator');

const DiscoveryEndpoint = require('./endpoints/discovery')
const HealthEndpoint = require('./endpoints/health')
const InfoEndpoint = require('./endpoints/info')
const TraceEndpoint = require('./endpoints/trace')
/**
 * 
 */
class Registry {

    constructor(options) {
        this._endpoints = {}
        this._addEndpoint(new DiscoveryEndpoint({
            contributors: this._endpoints
        }))
        this._addEndpoint(new HealthEndpoint())
        this._addEndpoint(new InfoEndpoint())
        this._addEndpoint(new TraceEndpoint())
    }

    /**
     * 
     * @private
     * @param {Endpoint} endpoint 
     */
    _addEndpoint(endpoint) {
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