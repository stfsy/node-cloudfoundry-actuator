'use strict'

const resolve = require('path').resolve
const http = require('http')
const expect = require('chai').expect

const requestResponseSanitizer = require(resolve('lib/security/request-response-sanitizer'))

describe('RequestResponseSanitizer', () => {
    let clientRequest = null
    let serverResponse = null
    beforeEach(() => {
        clientRequest = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/xml',
                'host': 'localhost:8080',
                'x-test': 'true'
            }
        }
        serverResponse = {
            getHeaders: () => {
                return {
                    'content-type': 'application/xml',
                    'x-server': 'true',
                    'x-test': 'true'
                }
            }
        }
    })
    describe('.sanitizedRequestHeaders', () => {
        it('should return all headers', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove authorization header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(Object.assign(clientRequest, { authorization: 'Bearer aksdöfjöasdfkjöasldfaw' }))
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(Object.assign(clientRequest, { AUTHORIZATION: 'Bearer aksdöfjöasdfkjöasldfaw' }))
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove cookie header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(Object.assign(clientRequest, { cookie: 'b=aksdöfjöasdfkjöasldfaw' }))
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(Object.assign(clientRequest), { CooKie: 'a=aksdöfjöasdfkjöasldfaw' })
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
    })
    describe('.sanitizedResponseHeaders', () => {
        it('should return all headers', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove authorization header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders((Object.assign(serverResponse, { authorization: 'Bearer aksdöfjöasdfkjöasldfaw' })))
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(Object.assign(serverResponse, { AUTHORIZATION: 'Bearer aksdöfjöasdfkjöasldfaw' }))
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove cookie header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(Object.assign(serverResponse), { cookie: 'b=aksdöfjöasdfkjöasldfaw' })
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(Object.assign(serverResponse), { CooKie: 'a=aksdöfjöasdfkjöasldfaw' })
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
    })
})