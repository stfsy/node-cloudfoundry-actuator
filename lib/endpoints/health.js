'use strict'

const ContributorScanningEndpoint = require('./contributor-scanning-endpoint')

/**
 * 
 * @extends ContributorScanningEndpoint
 */
class HealthEndpoint extends ContributorScanningEndpoint {

    constructor() {
        super({
            name: 'health',
            allowHeaders: ['authorization', 'x-cf-app-instance']
        })
   }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res
     * @returns {Promise]} 
     */
    _handle(req, res) {
        return Promise.resolve(
            this._contributors[0].getInfo()
        )
    }
}

module.exports = HealthEndpoint