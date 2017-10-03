'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const DiscoveryEndpoint = require('./endpoints/discovery')
const HealthEndpoint = require('./endpoints/health')
const InfoEndpoint = require('./endpoints/info')
const metrics = require('./endpoints/metrics')
const trace = require('./endpoints/trace')

class Registry {

    constructor(options) {
        this._endpoints = {}
        this.__addEndpoint(new DiscoveryEndpoint(this._endpoints))
        this.__addEndpoint(new HealthEndpoint())
        this.__addEndpoint(new InfoEndpoint())
    }

    __addEndpoint(endpoint) {
        this._endpoints[endpoint.getPath()] = endpoint
    }

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