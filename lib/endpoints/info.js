'use strict'

const modulesScan = require('modules-scan')
const resolve = require('path').resolve

const Endpoint = require('./endpoint')
const InfoContributor = require('./contributors/info/info-contributor')

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
     */
    handle(req, res) {
        super.handle(req, res)
        return this._contributors.reduce((current, next) => {
            const context = next.getContext()
            const value = next.getInfo()
            current[context] = value
            return current
        }, {})
    }
}

module.exports = InfoEndpoint