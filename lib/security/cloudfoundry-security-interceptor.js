'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const cloudFoundryEnvironmentAdapter = require('./cloudfoundry-environment-adapter')
const cloudFoundryCloudControllerAdapter = require('./cloudfoundry-cloud-controller-adapter')
const cloudFoundryTokenValidator = require('./cloudfoundry-token-validator')

class CloudFoundrySecurityInterceptor {

    constructor() {

    }

    /**
     * 
     * @returns {boolean} true if request processing should continue
     */
    handle(res, req) {
        const token = this._extractToken(res)
        log('handleRequest securityInterceptor withToken %s', token)
        return this._hasValidToken(token)
            .then((result) => {
                return this._hasPermission(token)
            })
    }

    _extractToken(req) {
        const bearer = req.header('authorization')
        log('extractToken securityInterceptor withBearer %s', bearer)
        if (!bearer) {
            return
        }
        const token = bearer.replace('bearer ', '')
        return token
    }

    _hasValidToken(token) {
        return cloudFoundryTokenValidator.validate(token)
    }

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