'use strict'

const modulesScan = require('modules-scan')
const resolve = require('path').resolve

const Endpoint = require('./endpoint')
const InfoContributor = require('./contributors/info-contributor')

/**
 * 
 * @extends Endpoint
 */
class InfoEndpoint extends Endpoint {

    constructor() {
        super({
            name: 'info'
        })

        const scannedModules = modulesScan.byType(resolve(__dirname, 'contributors/info'), InfoContributor, {
            excludeBaseType: true
        })
        this._contributors = scannedModules.map(Module => new Module())
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