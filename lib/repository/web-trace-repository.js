'use strict'

const requestResponseSanitizer = require('../security/request-response-sanitizer')

class WebTraceRepository {

    constructor() {
        this._traces = []
        this._maxTraces = 100
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ServerResponse} res 
     */
    add(req, res, responseTime) {
        const trace = {
            timestamp: Date.now(),
            info: {
                method: req.method,
                path: req.path,
                timeTaken:  responseTime,
                headers: {
                    request: requestResponseSanitizer.sanitizedRequestHeaders(req),
                    response: requestResponseSanitizer.sanitizedResponseHeaders(res)
                }
            }
        }

        trace.info.headers.response.status = res.statusCode + ''

        this._traces.splice(0, 0, trace)

        while (this._traces.length > this._maxTraces) {
            this._traces.pop()
        }
    }

    /**
     * 
     * @returns {Array<Trace>} an array of trace objects
     */
    get() {
        return this._traces
    }
}

module.exports = new WebTraceRepository()