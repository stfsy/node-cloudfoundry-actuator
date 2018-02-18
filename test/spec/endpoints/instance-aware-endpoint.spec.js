'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const InstanceAwareEndpoint = require(resolve('lib/endpoints/instance-aware-endpoint'))

describe('InstanceAwareEndpoint', () => {
    let endpoint = null
    beforeEach(() => {
        endpoint = new InstanceAwareEndpoint({
            name: 'health'
        })
    })
    describe('.getPath', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getPath()).to.equal('/cloudfoundryapplication/health/')
        })
    })
    describe('.getName', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getName()).to.equal('health')
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
        it('should set response headers', () => {
            const response = mockResponse()
            return endpoint.handleRequest({}, response)
                .then(() => {
                    expect(response.getHeader()['Access-Control-Allow-Origin']).to.equal('*')
                    expect(response.getHeader()['Access-Control-Allow-Headers']).to.equal('authorization, x-cf-app-instance')
                    expect(response.getHeader()['Access-Control-Allow-Methods']).to.equal('GET')
                })
        })
    })
})