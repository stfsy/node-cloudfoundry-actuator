'use strict'

const log = require('util').debuglog('cloudfoundry-actuator');

const Registry = require('./registry')
const registry = new Registry()

const interceptor = require('./security/cloudfoundry-security-interceptor')

/**
 * 
 */
class ActuatorRequestHandler {

    /**
     * 
     * @param {http.ClientRequest} req the client request
     * @param {http.ServerResponse} res the server response
     * @returns {boolean} true, if the request was or will be handled and no further processing is necessary
     */
    handle(req, res) {
        this._handle(req, res)
    }

    /**
     * 
     * @private
     * @param {http.ClientRequest} req 
     * @param {http.ServerResponse} res 
     */
    _handle(req, res) {
        if (req.path.indexOf('cloudfoundryapplication') == -1) {
            return false
        }

        let endpoint = registry.getEndpoint(req)

        if (!endpoint) {
            res.status(404).send()
        }

        interceptor.handle(req)
            .then(() => {
                const result = endpoint.handle(req, res)
                res.setHeader('Content-Type', 'application/json')
                res.status(200).send(JSON.stringify(result))
            })
            .catch((e) => {
                log('actuator handlingRequest err %j', e)
                if (e && e.getStatus && e.getMessage) {
                    res.status(e.getStatus()).send(e.getMessage())
                } else {
                    res.status(500).send()
                }
            })
        return true
    }
}

module.exports = ActuatorRequestHandler