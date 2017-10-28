'use strict'

const fs = require('fs')
const resolve = require('path').resolve
const expect = require('chai').expect

const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), {
    encoding: 'utf-8'
})
process.env.VCAP_APPLICATION = env

const cloudFoundrySecurityInterceptor = require(resolve('lib/security/cloudfoundry-security-interceptor'))

describe('CloudFoundrySecurityInterceptor', () => {
    describe('.handle', () => {
        it('should reject with a security error if no token was given', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundrySecurityInterceptor.handle({
                        header: () => {}
                    }).then(reject)
                    .catch((e) => {
                        expect(e.getStatus()).to.equal(403)
                        expect(e.getMessage()).to.contain("Access denied")
                        resolve()
                    })
            })
        })
        xit('should reject with a security error if the token is invalid', () => {
            return new Promise((resolve, reject) => {
                return cloudFoundrySecurityInterceptor.handle({
                        header: () => 'Bearer abcdef'
                    }).then(reject)
                    .catch((e) => {
                        expect(e.getStatus()).to.equal(403)
                        expect(e.getMessage()).to.contain("Access denied")
                        resolve()
                    })
            })
        })
        it('should reject with a security error if user does not have priviledges', () => {

        })
    })
})