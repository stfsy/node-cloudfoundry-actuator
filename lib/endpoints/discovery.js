'use strict'

const Endpoint = require('./endpoint')

/**
 * 
 * @extends Endpoint
 */
class DiscoveryEndpoint extends Endpoint {

    constructor(endpoints) {
        super({
            name: ''
        })
        this._endpoints = endpoints
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     */
    handle(req, res) {
        super.handle(req, res)

        const url = 'https://' + req.get('host') + req.originalUrl
        const _links = {
            self: {
                href: url
            }
        }

        for (const key in this._endpoints) {
            const endpointName = this._endpoints[key].getName()

            _links[endpointName] = {
                href: url + '/' + endpointName
            }
        }

        return {
            _links
        }
    }
}

module.exports = DiscoveryEndpoint