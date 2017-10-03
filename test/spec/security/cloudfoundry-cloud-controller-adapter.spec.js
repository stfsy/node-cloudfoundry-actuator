'use strict'

const fs = require('fs')
const resolve = require('path').resolve
const expect = require('chai').expect

const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), {
    encoding: 'utf-8'
})
process.env.VCAP_APPLICATION = env
const cloudControllerMockServer = require(resolve('test/spec/security/cloud-controller-mock-server'))
const cloudFoundryCloudControllerAdapter = require(resolve('lib/security/cloudfoundry-cloud-controller-adapter'))

describe('CloudFoundryCloudControllerAdapter', () => {
    after(() => {
        return new Promise((resolve, reject) => {
            cloudControllerMockServer.close(resolve)
        })
    })
    describe('.fetchTokenKeys', () => {
        it('should return the token keys used to encrypt oauth tokens', () => {
            return cloudFoundryCloudControllerAdapter.fetchTokenKeys()
                .then((result) => {
                    expect(result).not.to.be.undefined
                    expect(result['key-1']).not.to.be.undefined
                    expect(result['key-1'].value).to.contain('PUBLIC KEY')
                })
        })
    })
    describe('.fetchInfo', () => {
        it('should return the absolute url of the token endpoint', () => {
            return cloudFoundryCloudControllerAdapter.fetchInfo()
                .then((result) => {
                    expect(result.token_endpoint).to.equal('http://localhost:5123')
                })
        })
    })
    describe('.fetchPermissions', () => {
        it('should return the permissions of the current user', () => {
            return cloudFoundryCloudControllerAdapter.fetchPermissions()
                .then((result) => {
                    expect(result.readSensitive).to.equal(true)
                    expect(result.readBasic).to.equal(true)
                })
        })
    })
})