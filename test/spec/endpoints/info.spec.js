'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const InfoEndpoint = require(resolve('lib/endpoints/info'))

describe('InfoEndpoint', () => {
    let endpoint = null
    beforeEach(() => {
        endpoint = new InfoEndpoint()
    })
    describe('.getPath', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getPath()).to.equal('/cloudfoundryapplication/info/')
        })
    })
    describe('.getName', () => {
        it('should return the endpoints name', () => {
            expect(endpoint.getName()).to.equal('info')
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
        it('should return application infos', () => {
            const response = mockResponse()
            return endpoint.handleRequest({}, response)
                .then((result) => {
                    expect(result.build.name).to.contain('actuator')
                    expect(result.build.version).to.match(/\d.\d.\d/)
                })
        })
    })
})