'use strict'

const resolve = require('path').resolve
const fs = require('fs')
const expect = require('chai').expect

describe('CloudFoundryEnvironmentAdapter', () => {
    let environmentAdapter = null      
    beforeEach(() => {
        require.cache['lib/security/cloudfoundry-environment-adapter'] = null
        const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), { encoding: 'utf-8'})
        process.env.VCAP_APPLICATION = env
        environmentAdapter = require(resolve('lib/security/cloudfoundry-environment-adapter'))
  
    })
    describe('.getCloudControllerUrl', () => {
        it('should the cloud controller url', () => {
            const url = environmentAdapter.getCloudControllerUrl()
            expect(url).to.equal('http://localhost:5123')
        })
    })
    describe('.getCloudControllerInfoUrl', () => {
        it('should return the cloud controller info endpoint url', () => {
            const url = environmentAdapter.getCloudControllerInfoUrl()
            expect(url).to.equal('http://localhost:5123/info')
        })
    })
    describe('.getApplicationId', () => {
        it('should return the current application id', () => {
            const id = environmentAdapter.getApplicationId();
            expect(id).to.equal('my-application-id')
        })
    })
    describe('.getPermissionsUrl', () => {
        it('should return the absolute permissions url of current application', () => {
            const url = environmentAdapter.getPermissionsUrl()
            expect(url).to.equal('http://localhost:5123/v2/apps/my-application-id/permissions')
        })
    })
})