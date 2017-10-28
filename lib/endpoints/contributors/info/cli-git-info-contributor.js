'use strict'

const fs = require('fs')
const resolve = require('path').resolve

class CliGitfoContributor {

    constructor() {
        try {
            const content = fs.readFileSync((resolve('.actuator', 'info.json')), {
                encoding: 'utf-8'
            })
            this.info = JSON.parse(content)
        } catch (e) {
            this.info = {}
        }
    }

    getContext() {
        return "git"
    }

    getInfo() {
        return this.info.git
    }
}

module.exports = new CliGitfoContributor()