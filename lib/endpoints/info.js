'use strict'

const Endpoint = require('./endpoint')
const NpmInfoContributor = require('./contributors/info/cli-build-info-contributor')
const GitInfoContributor = require('./contributors/info/cli-git-info-contributor')
/**
 * 
 * @extends Endpoint
 */
class InfoEndpoint extends Endpoint {

    constructor({
        contributors = [NpmInfoContributor, GitInfoContributor]
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