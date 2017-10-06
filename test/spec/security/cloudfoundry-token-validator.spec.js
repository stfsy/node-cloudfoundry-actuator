'use strict'

const fs = require('fs')
const resolve = require('path').resolve
const expect = require('chai').expect

const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), {
    encoding: 'utf-8'
})
process.env.VCAP_APPLICATION = env

const cloudControllerMockServer = require(resolve('test/spec/security/cloud-controller-mock-server'))
const uaaTokenProvider = require(resolve('test/spec/security/cloudfoundry-uaa-mock-token-provider'))
const cloudFoundryTokenValidator = require(resolve('lib/security/cloudfoundry-token-validator'))

describe('CloudFoundryTokenValidator', () => {
    after(() => {
        return new Promise((resolve, reject) => {
            cloudControllerMockServer.close(resolve)
        })
    })
    describe('.validate', () => {
        it('should resolve if a jwt was validated', () => {
            return cloudFoundryTokenValidator.validate(uaaTokenProvider.createValidToken())
        })
        it('should reject if no token was given', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundryTokenValidator.validate().then(reject, resolve)                
            })
        })
        it('should reject if a token cannot be validated', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundryTokenValidator.validate(uaaTokenProvider.createInvalidToken())
                    .then(reject, resolve)
            })
        })
        it('should reject if a token is expired', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundryTokenValidator.validate(uaaTokenProvider.createExpiredToken())
                    .then(reject, resolve)
            })
        })
        it('should reject if the issuer is unknown', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundryTokenValidator.validate(uaaTokenProvider.createTokenWithInvalidIssuer())
                    .then(reject, resolve)
            })
        })
    })
})