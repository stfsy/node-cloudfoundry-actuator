'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const DiscoveryEndpoint = require(resolve('lib/endpoints/discovery'))
const HealthEndpoint = require(resolve('lib/endpoints/health'))
const InfoEndpoint = require(resolve('lib/endpoints/info'))

describe('DiscoveryEndpoint', () => {
    let endpoint = null
    beforeEach(() => {
        endpoint = new DiscoveryEndpoint({
            contributors: {'/health': new HealthEndpoint(), '/info': new InfoEndpoint()}
        })
    })
    describe('.getPath', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getPath()).to.equal('/cloudfoundryapplication/')
        })
    })
    describe('.getName', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getName()).to.equal('')
        })
    })
    describe('.handleRequest', () => {
        let mockResponse = () => {
            const header = {}
            return {
                setHeader: (key, value) => header[key] = value,
                getHeader: () => header
            }
        }
        let mockRequest = () => {
            return {
                get: () => 'localhost:3000',
                originalUrl: '/cloudfoundryapplication'
            }
        }
        it('should set response headers', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then(() => {
                    expect(response.getHeader()['Access-Control-Allow-Origin']).to.equal('*')
                    expect(response.getHeader()['Access-Control-Allow-Headers']).to.equal('authorization')
                    expect(response.getHeader()['Access-Control-Allow-Methods']).to.equal('GET')
                })
        })
        it('should return links to registered endpoints', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then((result) => {
                    expect(result._links).not.to.be.undefined
                })
        })
        it('should return an absolute link to itself', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then((result) => {
                    expect(result._links.self.href).to.equal('https://localhost:3000/cloudfoundryapplication')
                })
        })
        it('should return an absolute link to the health endpoint', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then((result) => {
                    expect(result._links.health.href).to.equal('https://localhost:3000/cloudfoundryapplication/health')
                })
        })
        it('should return an absolute link to the info endpoint', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then((result) => {
                    expect(result._links.info.href).to.equal('https://localhost:3000/cloudfoundryapplication/info')
                })
        })
        it('should not return an absolute link to the discovery endpoint', () => {
            const response = mockResponse()
            return endpoint.handleRequest(mockRequest(), response)
                .then((result) => {
                    expect(result._links[""]).to.be.undefined
                })
        })
    })
})