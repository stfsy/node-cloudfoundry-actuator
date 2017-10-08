'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const InfoEndpoint = require(resolve('lib/endpoints/info'))

describe('HealthEndpoint', () => {
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
    describe('.handle', () => {
        let mockResponse = () => {
            const header = {}
            return {
                setHeader: (key, value) => header[key] = value,
                getHeader: () => header
            }
        }
        it('should set response headers', () => {
            const response = mockResponse()
            endpoint.handle({}, response)
            expect(response.getHeader()['Access-Control-Allow-Origin']).to.equal('*')
            expect(response.getHeader()['Access-Control-Allow-Headers']).to.equal('authorization')
            expect(response.getHeader()['Access-Control-Allow-Methods']).to.equal('GET')
        })
        it('should return the current status', () => {
            const response = mockResponse()
            const result = endpoint.handle({}, response)
            expect(result.build).not.to.be.undefined
            expect(result.build.version).to.equal(process.env.npm_package_version)
            expect(result.build.name).to.equal(process.env.npm_package_name)
        })
    })
})