'use strict'

const Registry = require('./registry')
const registry = new Registry()

const interceptor = require('./security/cloudfoundry-security-interceptor')
const webTraceRepository = require('./repository/web-trace-repository')

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
    handle(req, res, next) {
        this._trace(req, res)
        return this._handle(req, res, next)
    }

    /**
     * 
     * @private
     * @param {http.ClientRequest} req 
     * @param {http.ServerResponse} res 
     */
    _trace(req, res) {
        const start = Date.now()
        res.on('finish', () => {
            const duration = Date.now() - start
            webTraceRepository.add(req, res, duration)
        })
    }

    /**
     * 
     * @private
     * @param {http.ClientRequest} req 
     * @param {http.ServerResponse} res 
     */
    _handle(req, res, next) {
        if (req.path.indexOf('cloudfoundryapplication') == -1) {
            return next()
        }

        let endpoint = registry.getEndpoint(req)

        if (!endpoint) {
            res.status(404).send() 
            return Promise.resolve()
        }

        return interceptor.handle(req)
            .then(() => {
                return endpoint.handleRequest(req, res)
            })
            .then((result) => {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).send(JSON.stringify(result))
            })
            .catch((e) => {
                if (e && e.getStatus && e.getMessage) {
                    res.status(e.getStatus()).send(e.getMessage())
                } else {
                    res.status(500).send()
                }
            })
    }
}

module.exports = ActuatorRequestHandler