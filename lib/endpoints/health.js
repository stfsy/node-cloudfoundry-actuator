'use strict'

const InstanceAwareEndpoint = require('./instance-aware-endpoint')

/**
 * 
 * @extends InstanceAwareEndpoint
 */
class HealthEndpoint extends InstanceAwareEndpoint {

    constructor({
        contributors = []
    } = {}) {
        super({
            name: 'health',
        })

        this._contributors = contributors
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res
     * @returns {Promise]} 
     */
    _handle(req, res) {
        return Promise.resolve({
            status: 'UP'
        })
    }
}

module.exports = HealthEndpoint