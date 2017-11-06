'use strict'

const Endpoint = require('./endpoint')

class InstanceAwareEndpoint extends Endpoint {

    constructor({
        name,
        allowHeaders = ['authorization', 'x-cf-app-instance'],
        allowMethods
    }) {
        super({
            name,
            allowHeaders,
            allowMethods
        })
    }
}

module.exports = InstanceAwareEndpoint