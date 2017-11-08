'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const http = require('http')

const webTraceRepository = require(resolve('lib/repository/web-trace-repository'))
webTraceRepository._maxTraces = 10

describe('WebTraceRepository', () => {
    let clientRequest = null
    let serverResponse = null
    beforeEach(() => {
        clientRequest = new http.ClientRequest('http://localhost:8080')
        clientRequest.setHeader('accept', 'application/json')
        clientRequest.setHeader('content-type', 'application/xml')
        clientRequest.setHeader('x-test', 'true')
        serverResponse = new http.ServerResponse(new http.IncomingMessage(null))
        serverResponse.setHeader('content-type', 'application/xml')
        serverResponse.setHeader('x-server', 'true')
        serverResponse.setHeader('x-test', 'true')
    })
    describe('.add', () => {
        it('should only keep a maximum length of elements', () => {
            for (let i = 0, n = 100; i < n; i++) {
                webTraceRepository.add(clientRequest, serverResponse)
                expect(webTraceRepository.get().length).to.be.lessThan(11)
            }
        })
    })
})