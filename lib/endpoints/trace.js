'use strict'

const InstanceAwareEndpoint = require('./instance-aware-endpoint')
const webTraceRepository = require('../repository/web-trace-repository')

/**
 * 
 * @extends InstanceAwareEndpoint
 */
class TraceEndpoint extends InstanceAwareEndpoint {

    constructor({
        contributors = [],
    } = {}) {
        super({
            name: 'trace'
        })

        this._contributors = contributors
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     */
    handle(req, res) {
        super.handle(req, res)

        return webTraceRepository.get()
    }
}

module.exports = TraceEndpoint