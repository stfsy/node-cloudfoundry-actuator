'use strict'

const resolve = require('path').resolve

const Endpoint = require('./endpoint')
const NpmInfoContributor = require(resolve('lib/endpoints/contributors/info/npm-build-info-contributor'))
/**
 * 
 * @extends Endpoint
 */
class InfoEndpoint extends Endpoint {

    constructor({
        contributors = [NpmInfoContributor]
    } = {}) {
        super({
            name: 'info'
        })

        this._contributors = contributors
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