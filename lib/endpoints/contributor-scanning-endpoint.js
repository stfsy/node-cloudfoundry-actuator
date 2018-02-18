'use strict'

const modulesScan = require('modules-scan')
const resolve = require('path').resolve
const InfoContributor = require('./contributors/info-contributor')

const Endpoint = require('./endpoint')
/**
 * 
 * @extends Endpoint
 */
class ContributorScanningEndpoint extends Endpoint {

    constructor({
        name,
        allowHeaders,
        allowMethods
    }) {
        super({
            name,
            allowHeaders,
            allowMethods
        })
        const scannedModules = modulesScan.byType(resolve(__dirname, 'contributors', name), InfoContributor, {
            excludeBaseType: true
        })
        this._contributors = scannedModules.map(Module => new Module())
    }
}

module.exports = ContributorScanningEndpoint