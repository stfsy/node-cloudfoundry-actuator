'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const Endpoint = require(resolve('lib/endpoints/endpoint'))

describe('Endpoint', () => {
    let endpoint = null
    beforeEach(() => {
        endpoint = new Endpoint({
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
                    expect(response.getHeader()['Access-Control-Allow-Headers']).to.equal('authorization')
                    expect(response.getHeader()['Access-Control-Allow-Methods']).to.equal('GET')
                })
        })
    })
})