'use strict'

/**
 * 
 */
class RequestResponseSanitizer {

    constructor() {
        this.sensitiveHeaders = ['authorization', 'cookie']
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     */
    sanitizedRequestHeaders(req) {
        return this._sanitizedHeaders(req.headers)
    }

    /**
     * 
     * @param {http.ServerResponse} res 
     */
    sanitizedResponseHeaders(res) {
        return this._sanitizedHeaders(res.getHeaders())
    }

    _sanitizedHeaders(headers = {}) {
        return Object.keys(headers).reduce((current, next) => {
            const sensitive = this.sensitiveHeaders.find((header) => header == next.toLowerCase())

            if (!sensitive) {
                current[next] = headers[next]
            }

            return current            
        }, {})
    }
}

module.exports = new RequestResponseSanitizer()