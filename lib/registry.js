'use strict'

const DiscoveryEndpoint = require('./endpoints/discovery')
const HealthEndpoint = require('./endpoints/health')
const InfoEndpoint = require('./endpoints/info')
const TraceEndpoint = require('./endpoints/trace')
/**
 * 
 */
class Registry {

    constructor(options = {}) {
        this._endpoints = {}
        this._addEndpoint(new DiscoveryEndpoint({
            contributors: this._endpoints
        }))
        this.__strictFalseOrElseTrue('health.enabled', options) && this._addEndpoint(new HealthEndpoint())
        this.__strictFalseOrElseTrue('info.enabled', options) && this._addEndpoint(new InfoEndpoint())
        this.__strictFalseOrElseTrue('trace.enabled', options) && this._addEndpoint(new TraceEndpoint())
    }

    /**
     * 
     * @private
     * @param {string} path 
     * @param {Object} context 
     */
    __strictFalseOrElseTrue(path, context) {
        return path.split('.').reduce((current, next) => {
            const value = current[next]
            if (value === undefined || value === null || value === true) {
                return true
            } else if (value === false) {
                return false
            } else {
                return value
            }
        }, context)
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

        return this._endpoints[path]
    }
}

module.exports = Registry