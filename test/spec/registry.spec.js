'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const Registry = require(resolve('lib/registry'))

describe('Registry', () => {
    describe('.getEndpoint', () => {
        let registry = null
        beforeEach(() => {
            registry = new Registry()
        })
        it('should return info endpoint', () => {
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/info'})
            expect(endpoint.getName()).to.equal('info')
        })
        it('should remove the trailing slash and return info endpoint', () => {
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/info/'})
            expect(endpoint.getName()).to.equal('info')
        })
        it('should return the health endpoint', () => {
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/health'})
            expect(endpoint.getName()).to.equal('health')
        })
        it('should remove the trailing slash and return the health endpoint', () => {
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/health/'})
            expect(endpoint.getName()).to.equal('health')
        })
        it('should return the discovery endpoint', () => {
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication'})
            expect(endpoint.getName()).not.to.be.undefined
        })
        it('should return undefined if the endpoint is unknown', () => {
            const endpoint = registry.getEndpoint({path: '/abc'})
            expect(endpoint).to.be.undefined
        })
    })
    describe('.constructor', () => {
        it('allows disabling health endpoint', () => {
            const registry = new Registry({
                health: {
                    enabled: false
                }
            })
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/health/'})
            expect(endpoint).to.be.undefined
        })
        it('allows disabling info endpoint', () => {
            const registry = new Registry({
                info: {
                    enabled: false
                }
            })
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/info/'})
            expect(endpoint).to.be.undefined
        })
        it('allows disabling trace endpoint', () => {
            const registry = new Registry({
                trace: {
                    enabled: false
                }
            })
            const endpoint = registry.getEndpoint({path: '/cloudfoundryapplication/trace/'})
            expect(endpoint).to.be.undefined
        })
    })
})