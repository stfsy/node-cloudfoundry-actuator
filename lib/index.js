'use strict'

const Registry = require('./registry')
const registry = new Registry()

module.exports = (options) => {
    return (req, res, next) => {

        let endpoint = null

        if (req.path.indexOf('cloudfoundryapplication') > -1) {
            endpoint = registry.getEndpoint(req)
        }
        try {

            if (endpoint) {
                const result = endpoint.handle(req, res)
                res.status(200).send(JSON.stringify(result))
            } else {
                next()
            }
        } catch (e) {
            next()
        }
    }
}