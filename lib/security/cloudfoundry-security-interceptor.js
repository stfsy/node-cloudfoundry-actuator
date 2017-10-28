'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const cloudFoundryEnvironmentAdapter = require('./cloudfoundry-environment-adapter')
const cloudFoundryCloudControllerAdapter = require('./cloudfoundry-cloud-controller-adapter')
const cloudFoundryTokenValidator = require('./cloudfoundry-token-validator')

const SecurityError = require('./security-error')
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
    handle(req) {
        if (req.method == 'OPTIONS') {
            return Promise.resolve()
        }

        const token = this._extractToken(req)
        log('handleRequest securityInterceptor withToken %s', token)
        // TODO
        // should let endpoints decide to be secure
        // should not call this interceptor without oauth token
        if (!token) {
            return Promise.reject(SecurityError.Forbidden('Access denied'))
        }
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
            .catch(() => {
                return Promise.reject(SecurityError.Unauthorized('Invalid token'))
            })
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
                    return Promise.reject(SecurityError.Forbidden('Access denied'))
                }
            })
    }
}

module.exports = new CloudFoundrySecurityInterceptor()