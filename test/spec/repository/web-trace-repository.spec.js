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
        clientRequest = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/xml',
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
    describe('.add', () => {
        it('should only keep a maximum length of elements', () => {
            for (let i = 0, n = 100; i < n; i++) {
                webTraceRepository.add(clientRequest, serverResponse)
                expect(webTraceRepository.get().length).to.be.lessThan(11)
            }
        })
    })
})