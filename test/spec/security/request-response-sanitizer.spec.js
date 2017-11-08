'use strict'

const resolve = require('path').resolve
const http = require('http')
const expect = require('chai').expect

const requestResponseSanitizer = require(resolve('lib/security/request-response-sanitizer'))

describe('RequestResponseSanitizer', () => {
    let clientRequest = null
    let serverResponse = null
    beforeEach(() => {
        clientRequest = new http.ClientRequest('http://localhost:8080')
        clientRequest.setHeader('accept', 'application/json')
        clientRequest.setHeader('content-type', 'application/xml')
        clientRequest.setHeader('x-test', 'true')
        serverResponse = new http.ServerResponse(clientRequest)
        serverResponse.setHeader('content-type', 'application/xml')
        serverResponse.setHeader('x-server', 'true')
        serverResponse.setHeader('x-test', 'true')
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
            clientRequest.setHeader('authorization', 'Bearer aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            clientRequest.setHeader('AUTHORIZATION', 'Bearer aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove cookie header', () => {
            clientRequest.setHeader('cookie', 'b=aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedRequestHeaders(clientRequest)
            expect(Object.keys(sanitizedHeaders).length).to.equal(4)
            expect(sanitizedHeaders['host']).to.equal('localhost:8080')
            expect(sanitizedHeaders['accept']).to.equal('application/json')
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            clientRequest.setHeader('CooKie', 'a=aksdöfjöasdfkjöasldfaw')
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
            clientRequest.setHeader('authorization', 'Bearer aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive authorization header', () => {
            clientRequest.setHeader('AUTHORIZATION', 'Bearer aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove cookie header', () => {
            clientRequest.setHeader('cookie', 'b=aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
        it('should remove case sensitive cookie header', () => {
            clientRequest.setHeader('CooKie', 'a=aksdöfjöasdfkjöasldfaw')
            const sanitizedHeaders = requestResponseSanitizer.sanitizedResponseHeaders(serverResponse)
            expect(Object.keys(sanitizedHeaders).length).to.equal(3)
            expect(sanitizedHeaders['content-type']).to.equal('application/xml')
            expect(sanitizedHeaders['x-test']).to.equal('true')
            expect(sanitizedHeaders['x-server']).to.equal('true')
        })
    })
})