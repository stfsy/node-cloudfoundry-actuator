'use strict'

const fs = require('fs')
const resolve = require('path').resolve

// setup env
const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), {
    encoding: 'utf-8'
})
process.env.VCAP_APPLICATION = env

// setup mock cloud controller
// require(resolve('test/spec/security/cloud-controller-mock-server'))