'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const cloudFoundryEnvironmentAdapter = require('./cloudfoundry-environment-adapter')
const cloudFoundryCloudControllerAdapter = require('./cloudfoundry-cloud-controller-adapter')
const cloudFoundryTokenValidator = require('./cloudfoundry-token-validator')

/**
 * 
 */
class CloudFoundrySecurityInterceptor {

    constructor() {

    }

    /**
     * 
     * @param {http.ClientRequest} req
     * @param {http.ClientResponse} res
     * @returns {Promise<Object>} a promise that is resolved if the request processing may continue
     */
    handle(res, req) {
        const token = this._extractToken(res)
        log('handleRequest securityInterceptor withToken %s', token)
        return this._hasValidToken(token)
            .then((result) => {
                return this._hasPermission(token)
            })
    }

    /**
     * 
     * @private
     * @param {http.ClientRequest} req 
     * @returns {string} an oauth token without the bearer prefix, or null
     */
    _extractToken(req) {
        const bearer = req.header('authorization')
        log('extractToken securityInterceptor withBearer %s', bearer)
        if (!bearer) {
            return null
        }
        const token = bearer.replace('bearer ', '')
        return token
    }

    /**
     * 
     * @private
     * @param {string} token 
     * @returns {Promise<Object>} a promise that is resolved, if the token was validated
     */
    _hasValidToken(token) {
        return cloudFoundryTokenValidator.validate(token)
    }

    /**
     * 
     * @private
     * @param {string} token 
     * @returns {Promise<Object>} a promoise that is resolved, if the user that is represented by the token has permission to read sensitive data
     */
    _hasPermission(token) {
        return cloudFoundryCloudControllerAdapter.fetchPermissions(token) //
            .then((result) => {
                log('handleRequest securityInterceptor permissions %j', result)
                if (!result.readSensitive) {
                    // TODO
                    // return 401 or 401 indicator
                    return Promise.reject()
                }
            })
    }
}

module.exports = new CloudFoundrySecurityInterceptor()