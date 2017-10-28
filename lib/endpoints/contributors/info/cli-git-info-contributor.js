'use strict'

const fs = require('fs')
const resolve = require('path').resolve

class CliGitfoContributor {

    constructor() {
        const content = fs.readFileSync((resolve('.actuator','info.json')), { encoding: 'utf-8'})
        this.info = JSON.parse(content)
    }

    getContext() {
        return "git"
    }

    getInfo() {
        return this.info.git
    }
}

module.exports = new CliGitfoContributor()