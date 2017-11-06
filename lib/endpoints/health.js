'use strict'

const InstanceAwareEndpoint = require('./instance-aware-endpoint')

/**
 * 
 * @extends Endpoint
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
     */
    handle(req, res) {
        super.handle(req, res)

        return {
            "status": "UP"
        }
    }
}

module.exports = HealthEndpoint