'use strict'

const express = require('express')
const app = express()

const Actuator = require('../../lib/index')
const actuator = new Actuator()

const fetch = require('node-fetch')
const { expect } = require('chai')

const port = process.env.PORT || 5124

const jwt = require('./security/cloudfoundry-uaa-mock-token-provider').createValidToken()

app.use((req, res, next) => {
    actuator.handle(req, res, next)
})

app.get('/**', (req, res) => {
    res.status(503).send()
})

const server = app.listen(port)

describe('ActuatorRequestHandler', () => {
    after(() => {
        server.close()
    })
    it('calls next if not a cloudfoundryapplication path is called', () => {
        return fetch('http://localhost:5124/abc', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            expect(res.status).to.equal(503)
        })
    })
    it('returns 404 if an unknown endpoint was called', () => {
        return fetch('http://localhost:5124/cloudfoundryapplication/snd', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            expect(res.status).to.equal(404)
        })
    })
    it('returns found endpoints', () => {
        return fetch('http://localhost:5124/cloudfoundryapplication', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        }).then((registry) => {
            expect(Object.keys(registry._links).length).to.equal(4)
            expect(registry._links.self.href).to.equal('https://localhost:5124/cloudfoundryapplication')
            expect(registry._links.health.href).to.equal('https://localhost:5124/cloudfoundryapplication/health')
            expect(registry._links.info.href).to.equal('https://localhost:5124/cloudfoundryapplication/info')
            expect(registry._links.trace.href).to.equal('https://localhost:5124/cloudfoundryapplication/trace')
        })
    })
    it('returns traces', () => {
        return fetch('http://localhost:5124/cloudfoundryapplication/trace', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        }).then((traces) => {
            const trace = traces[0].info
            console.log(trace)
            expect(trace.method).to.equal('GET')
            expect(trace.path).to.equal('/cloudfoundryapplication')
            expect(trace.headers.request.accept).to.equal('*/*')
            expect(trace.headers.request.host).to.equal('localhost:5124')
        })
    })
    it('returns infos', () => {
        return fetch('http://localhost:5124/cloudfoundryapplication/info', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        }).then((info) => {
            const pkg = require('../../package.json')
            expect(info.build.name).to.equal(pkg.name)
            expect(info.build.version).to.equal(pkg.version)
            expect(info.build.description).to.equal(pkg.description)
        })
    })
    it('returns health', () => {
        return fetch('http://localhost:5124/cloudfoundryapplication/health', {
            headers: {
                authorization: 'bearer ' + jwt
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        }).then((health) => {
            expect(health.status).to.equal('UP')
        })
    })
})