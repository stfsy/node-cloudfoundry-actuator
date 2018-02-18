'use strict'

const ContributorScanningEndpoint = require('./contributor-scanning-endpoint')

/**
 * 
 * @extends ContributorScanningEndpoint
 */
class InfoEndpoint extends ContributorScanningEndpoint {

    constructor() {
        super({
            name: 'info'
        })
   }

    /**
     * 
     * @param {http.ClientRequest} req 
     * @param {http.ClientResponse} res 
     * @returns {Promise}
     */
    _handle(req, res) {
        return new Promise((resolve) => {
            const infos =this._contributors.reduce((current, next) => {
                const context = next.getContext()
                const value = next.getInfo()
                current[context] = value
                return current
            }, {})
            resolve(infos)
        })
    }
}

module.exports = InfoEndpoint