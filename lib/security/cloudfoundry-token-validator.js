'use strict'

const cloudFoundryCloudControllerAdapter = require('./cloudfoundry-cloud-controller-adapter')

/**
 * 
 */
class CloudFoundryTokenValidator {

  /**
   * 
   * @param {string} token 
   * @returns {Promise<Object>} a promise, that is resolved, if the token was validated
   */
  validate(token) {
    return Promise.resolve(true)
    // _validateAlgorithm(token);
    // _validateKeyIdAndSignature(token);
    // _validateExpiry(token);
    // _validateIssuer(token);
    // _validateAudience(token);
  }
}

module.exports = new CloudFoundryTokenValidator()