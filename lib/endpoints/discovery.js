'use strict'

const Endpoint = require('./endpoint')

/**
 * 
 * @extends Endpoint
 */
class DiscoveryEndpoint extends Endpoint {

    constructor({
        contributors = []
    } = {}) {
        super({
            name: ''
        })
        this._contributors = contributors
    }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     * @returns {Promise} promise
     */
    _handle(req, res) {
        return new Promise((resolve) => {
            const url = 'https://' + req.get('host') + req.originalUrl
            const _links = {
                self: {
                    href: url
                }
            }

            this._contributors.forEach((contributor) => {
                const endpointName = contributor.getName()

                _links[endpointName] = {
                    href: url + '/' + endpointName
                }
            })

            resolve({
                _links
            })
        })
    }
}

module.exports = DiscoveryEndpoint