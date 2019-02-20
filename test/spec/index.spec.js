'use strict'

const resolve = require('path').resolve
const expect = require('chai').expect
const RequestHandler = require(resolve('lib/index'))

describe('RequestHandler', () => {
    let handler = null
    beforeEach(() => {
        handler = new RequestHandler()
    })
    it('.handle', () => {
        let sc = 0
        const handled = handler.handle({
            path: '/cloudfoundryapplication/',
            header: () => {}
        }, {
            on: () => true,
            status: (statusCode) => {
                sc = statusCode
                return {
                    send: () => {}
                }
            }
        })
        expect(sc).to.equal(200)
        expect(handled).to.equal(true)
    })
})