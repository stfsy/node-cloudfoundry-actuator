'use strict'

const fs = require('fs')
const resolve = require('path').resolve

class CliBuildInfoContributor {

    constructor() {
        const content = fs.readFileSync((resolve('.actuator','info.json')), { encoding: 'utf-8'})
        this.info = JSON.parse(content)
    }

    getContext() {
        return "build"
    }

    getInfo() {
        return this.info.build
    }
}

module.exports = new CliBuildInfoContributor()