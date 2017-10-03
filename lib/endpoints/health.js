'use strict'

const Endpoint = require('./endpoint')

class HealthEndpoint extends Endpoint {

    constructor() {
        super({
            name: 'health',
            allowHeaders: ['authorization', 'x-cf-app-instance']
        })
    }

    handle(req, res) {
        super.handle(req, res)

        return {
            "status": "UP"
        }
    }
}

module.exports = HealthEndpoint