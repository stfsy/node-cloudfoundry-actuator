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
            _headers: {
                'accept': 'application/json',
                'content-type': 'application/xml',
                'host': 'localhost:8080',
                'x-test': 'true'
            },
        }
        serverResponse = {
            _headers: {
                'content-type': 'application/xml',
                'x-server': 'true',
                'x-test': 'true'
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
            clientRequest._headers.authorization = 'Bearer aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            clientRequest._headers.AUTHORIZATION = 'Bearer aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove cookie header', () => {
            clientRequest._headers.cookie = 'b=aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            clientRequest._headers.CooKie = 'a=aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
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
            clientRequest._headers.authorization = 'Bearer aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            clientRequest._headers.AUTHORIZATION = 'Bearer aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove cookie header', () => {
            clientRequest._headers.cookie = 'b=aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            clientRequest._headers.CooKie = 'a=aksdöfjöasdfkjöasldfaw'
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
    })
})