'use strict'

const fs = require('fs')
const resolve = require('path').resolve

const InfoContributor = require('./info-contributor')

class CliGitfoContributor extends InfoContributor {

    constructor() {
        super()
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