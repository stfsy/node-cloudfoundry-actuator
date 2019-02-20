'use strict'

const resolve = require('path').resolve

const cloudControllerMockServer = require(resolve('test/spec/security/cloud-controller-mock-server'))
cloudControllerMockServer.close(() => {
    console.log('Closed mock server')
})