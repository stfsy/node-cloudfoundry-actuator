'use strict'

const log = require('util').debuglog('cloudfoundry-actuator');

const jsonwebtoken = require('jsonwebtoken')
const cloudFoundryCloudControllerAdapter = require('./cloudfoundry-cloud-controller-adapter')

/**
 * 
 */
class CloudFoundryTokenValidator {

  constructor() {

  }

  /**
   * 
   * @param {string} token 
   * @returns {Promise<Object>} a promise, that is resolved, if the token was validated
   */
  validate(token) {
    return this._validateSignature(token)
      .then((jwt) => {
        return this._validateIssuer(jwt)
      })
  }

  _validateSignature(token) {

    log('validating tokenValidator fetchingTokenKeys')    

    return cloudFoundryCloudControllerAdapter.fetchTokenKeys()
      .then((keys => {

        const decodedJwt = jsonwebtoken.decode(token, {
          complete: true
        })

        if (!decodedJwt) {
          return Promise.reject()
        }

        const header = decodedJwt.header
        const keyId = header.kid

        const key = keys[keyId].value

        return jsonwebtoken.verify(token, key, {
          algorithms: ['RS256'],
        })
      }))
  }

  _validateIssuer(token) {
    return cloudFoundryCloudControllerAdapter.fetchTokenEndpoint()
      .then((tokenEndpoint) => {
        log('validating tokenValidator validateIssuer %s %s', tokenEndpoint + '/oauth/token', token.iss)                
        if (token.iss != tokenEndpoint + '/oauth/token') {
          return Promise.reject()
        }
      })
  }

  _validateAudience(token) {

  }
  // what does the token look like?
  //
  // eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJiYzE2YjY1NTllZTY0NTJhYjExMWI3ZDE0NDBhZTMzYyIsInN1YiI6IjdjMGU2YWIyLTIyMmItNGJmNC1hNGUxLTk0N2Q3NDhjZjVhMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIudXNlciJdLCJjbGllbnRfaWQiOiJhcHBzX21hbmFnZXJfanMiLCJjaWQiOiJhcHBzX21hbmFnZXJfanMiLCJhenAiOiJhcHBzX21hbmFnZXJfanMiLCJ1c2VyX2lkIjoiN2MwZTZhYjItMjIyYi00YmY0LWE0ZTEtOTQ3ZDc0OGNmNWExIiwib3JpZ2luIjoidWFhIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluIiwiYXV0aF90aW1lIjoxNTA3MTgwNTY1LCJyZXZfc2lnIjoiODE4ZmQ1N2YiLCJpYXQiOjE1MDcxODA1NjcsImV4cCI6MTUwNzIyMzc2NywiaXNzIjoiaHR0cHM6Ly91YWEubG9jYWwucGNmZGV2LmlvL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbImNsb3VkX2NvbnRyb2xsZXIiLCJhcHBzX21hbmFnZXJfanMiXX0.LwEa7hvHJPUG5Eqo - 35 b2xk6s7MxxYY7giGUu2skvYrAYhhMLIkVmyIQnP2mB_8DlLBb5gn0 - FH6NOMf5JIOlXF4y8tyyASTU9nHKxCMjO_FguurrKtSwpXryO5uerBXsUD_qL_IoJ5faO4KKiIPjkhVYiIn8cgl4em - jX6k0dU
  //
  // {
  //   "alg": "RS256",
  //   "kid": "key-1",
  //   "typ": "JWT"
  // }
  // {
  //   "jti": "bc16b6559ee6452ab111b7d1440ae33c",
  //   "sub": "7c0e6ab2-222b-4bf4-a4e1-947d748cf5a1",
  //   "scope": [
  //     "cloud_controller.user"
  //   ],
  //   "client_id": "apps_manager_js",
  //   "cid": "apps_manager_js",
  //   "azp": "apps_manager_js",
  //   "user_id": "7c0e6ab2-222b-4bf4-a4e1-947d748cf5a1",
  //   "origin": "uaa",
  //   "user_name": "admin",
  //   "email": "admin",
  //   "auth_time": 1507180565,
  //   "rev_sig": "818fd57f",
  //   "iat": 1507180567,
  //   "exp": 1507223767,
  //   "iss": "https://uaa.local.pcfdev.io/oauth/token",
  //   "zid": "uaa",
  //   "aud": [
  //     "cloud_controller",
  //     "apps_manager_js"
  //   ]
  // }

}

module.exports = new CloudFoundryTokenValidator()