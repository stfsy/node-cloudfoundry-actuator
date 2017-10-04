'use strict'

const Endpoint = require('./endpoint')

/**
 * 
 * @extends Endpoint
 */
class HealthEndpoint extends Endpoint {

    constructor() {
        super({
            name: 'health',
            allowHeaders: ['authorization', 'x-cf-app-instance']
        })
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