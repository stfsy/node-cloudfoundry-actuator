'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const RequestHandler = require(resolve('lib/index'))

const jwt = require('./security/cloudfoundry-uaa-mock-token-provider').createValidToken()

describe('RequestHandler', () => {
    let handler = null
    beforeEach(() => {
        handler = new RequestHandler()
    })
    it('._handle', () => {
        let sc = 0
        let body = ''
        return handler._handle({
            path: '/cloudfoundryapplication/',
            header: () => 'bearer ' + jwt,
            get: () => 'localhost:5122',
            originalUrl: '/cloudfoundryapplication'
        }, {
            on: () => true,
            status: (statusCode) => {
                sc = statusCode
                return {
                    send: (responseBody) => {
                        body = responseBody
                    }
                }
            },
            setHeader: () => {

            }
        }).then(() => {
            expect(sc).to.equal(200)
            expect(body).to.contain('/info')
            expect(body).to.contain('/health')
            expect(body).to.contain('/cloudfoundryapplication')
        })
    })
})