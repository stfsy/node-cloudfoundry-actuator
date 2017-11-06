'use strict'

const log = require('util').debuglog('cloudfoundry-actuator');

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
        this._cachedTokenKeys = null
        this._cachedInfo = null
    }

    /**
     * 
     * @returns {Promise<Object>} a promise, that is resolved with keys, which are used to sign bearer tokens
     */
    fetchTokenKeys() {
        if (this._cachedTokenKeys) {
            return Promise.resolve(this._cachedTokenKeys)
        }

        return this.fetchTokenEndpoint()
            .then((result) => {
                log('fetchTokenKeys cloudController tokenEndpoint %j', result)
                return this._fetch(result + '/token_keys')
            })
            .then((result) => {
                log('fetchTokenKeys cloudController tokenEndpoint result %j', result)
                const keys = result.keys.reduce((current, next) => (current[next.kid] = next, current), {})
                return this._cachedTokenKeys = keys
            })
            .catch((error) => {
                log('fetchTokenKeys err %j', error)
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
                log('fetchTokenEndpoint cloudController result %j', result)
                return result.token_endpoint
            })
            .catch((e) => {
                log('fetchTokenEndpoint cloudController err %j', e)
                return Promise.reject(e)
            })
    }

    /**
     * 
     * @returns {Promise<Object>} a promise, that is resolved with cloud controller info
     */
    fetchInfo() {
        if (this._cachedInfo) {
            return Promise.resolve(this._cachedInfo)
        }

        return this._fetch(this._infoUrl, {}, {})
            .then((result) => {
                log('fetchTokenKeys cloudController info result %j', result)
                return this._cachedInfo = result
            })
            .catch((e) => {
                log('fetchTokenEndpoint cloudController info err %j', e)
                return Promise.reject(e)
            })
    }

    /**
     *
     * @param {string} token the oauth token, that is used to lookup permissions
     * @returns {Promise<Object>} a promise, that is resolved with read permission info 
     */
    fetchPermissions(token) {
        log('fetchPermissions cloudController')
        return this._fetch(this._permissionsUrl, {
                "Authorization": "Bearer " + token
            }, {})
            .then((result) => {
                log('fetchPermissions cloudController result %j', result)
                return {
                    readSensitive: result.read_sensitive_data || false,
                    readBasic: result.read_basic_data || false
                }
            })
            .catch((error) => {
                log('fetchPermissions cloudController err %j', error)
                return Promise.reject(error)
            })
    }
}

module.exports = new CloudFoundryCloudControllerAdapter()