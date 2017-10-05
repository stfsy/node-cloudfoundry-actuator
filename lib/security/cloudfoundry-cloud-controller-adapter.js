'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const HttpAdapter = require('./http-adapter')
const cloudFoundryEnvironmentAdapter = require('./cloudfoundry-environment-adapter')

/**
 * 
 */
class CloudFoundryCloudControllerAdapter extends HttpAdapter {

    constructor() {
        super()
        this._permissionsUrl = cloudFoundryEnvironmentAdapter.getPermissionsUrl()
        this._infoUrl = cloudFoundryEnvironmentAdapter.getCloudControllerInfoUrl()
    }

    /**
     * 
     * @returns {Promise<Object>} a promise, that is resolved with keys, which are used to sign bearer tokens
     */
    fetchTokenKeys() {
        return this.fetchTokenEndpoint()
            .then((result) => {
                return this._fetch(result + '/token_keys')
            })
            .then((result) => {
                log('fetchTokenKeys cloudController tokenEndpoint result %j', result)
                const tokenKeys = {}
                result.keys.forEach((key) => tokenKeys[key.kid] = key)
                log('fetchTokenKeys cloudController keys %j', tokenKeys)
                return tokenKeys
            })
            .catch((error) => {
                log('fetchTokenKeys err %s', error)
                Promise.reject(error)
            })
    }

    /**
     * 
     * @return {Promise<String>} a promise, that is resolved with the url of the token endpoint
     */
    fetchTokenEndpoint() {
        return this.fetchInfo()
            .then((result) => {
                return result.token_endpoint
            })
    }

    /**
     * 
     * @returns {Promise<Object>} a promise, that is resolved with cloud controller info
     */
    fetchInfo() {
        return this._fetch(this._infoUrl, {}, {})
            .then((result) => {
                log('fetchTokenKeys cloudController info result %j', result)
                return result
            })
    }

    /**
     *
     * @param {string} token the oauth token, that is used to lookup permissions
     * @returns {Promise<Object>} a promise, that is resolved with read permission info 
     */
    fetchPermissions(token) {
        log('fetchPermissions cloudController %s for %s', this._permissionsUrl, token)
        return this._fetch(this._permissionsUrl, {
                "Authorization": "Bearer " + token
            }, {})
            .then((result) => {
                log('fetchPermissions result %j', result)
                return {
                    readSensitive: result.read_sensitive_data || false,
                    readBasic: result.read_basic_data || false
                }
            })
            .catch((error) => {
                log('fetchPermissions err %j', error)
                return Promise.reject(error)
            })
    }
}

module.exports = new CloudFoundryCloudControllerAdapter()