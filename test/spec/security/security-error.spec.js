'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect

const SecurityError = require(resolve('lib/security/security-error'))

describe('SecurityError', () => {
    describe('.Unauthorized', () => {
        describe('.getStatus', () => {
            it('should return 401', () => {
                const error = SecurityError.Unauthorized('Invalid token')
                expect(error.getStatus()).to.equal(401)
            })
        })
        describe('.getMessage', () => {
            it('should return the given message', () => {
                const error = SecurityError.Unauthorized('Invalid token')
                expect(error.getMessage()).to.equal('Invalid token')
            })
        })
    })
    describe('.Fordbidden', () => {
        describe('.getStatus', () => {
            it('should return 401', () => {
                const error = SecurityError.Forbidden('Invalid token')
                expect(error.getStatus()).to.equal(403)
            })
        })
        describe('.getMessage', () => {
            it('should return the given message', () => {
                const error = SecurityError.Forbidden('Invalid token')
                expect(error.getMessage()).to.equal('Invalid token')
            })
        })
    })
})