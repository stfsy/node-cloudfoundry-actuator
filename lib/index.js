'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const Registry = require('./registry')
const registry = new Registry()

const interceptor = require('./security/cloudfoundry-security-interceptor')

module.exports = (options) => {
    return (req, res, next) => {

        let endpoint = null

        if (req.path.indexOf('cloudfoundryapplication') > -1) {
            endpoint = registry.getEndpoint(req)
        }

        if (!endpoint) {
            next()
            return
        }

        interceptor.handle(req)
            .then(() => {
                const result = endpoint.handle(req, res)
                res.setHeader('Content-Type', 'application/json')
                res.status(200).send(JSON.stringify(result))
            })
            .catch((e) => {
                log('actuator handlingRequest err %j', e)
                next()
            })
    }
}