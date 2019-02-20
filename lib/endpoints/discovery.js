'use strict'

const Endpoint = require('./endpoint')

/**
 * 
 * @extends Endpoint
 */
class DiscoveryEndpoint extends Endpoint {

    constructor({
        contributors = {}
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

            for(const key in this._contributors) {
                const contributor = this._contributors[key]
                const endpointName = contributor.getName()
                // ignore endpoints without a name, like this one
                if (endpointName) {
                    _links[endpointName] = {
                        href: url + '/' + endpointName
                    }
                }
            }

            resolve({
                _links
            })
        })
    }
}

module.exports = DiscoveryEndpoint