'use strict'

const modulesScan = require('modules-scan')
const resolve = require('path').resolve
const InfoContributor = require('./contributors/info-contributor')

const InstanceAwareEndpoint = require('./instance-aware-endpoint')

/**
 * 
 * @extends InstanceAwareEndpoint
 */
class HealthEndpoint extends InstanceAwareEndpoint {

    constructor({
        contributors = []
    } = {}) {
        super({
            name: 'health',
        })

        const scannedModules = modulesScan.byType(resolve(__dirname, 'contributors/health'), InfoContributor, {
            excludeBaseType: true
        })
        this._contributors = scannedModules.map(Module => new Module())
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