'use strict'

const fs = require('fs')
const resolve = require('path').resolve

const InfoContributor = require('./info-contributor')

/** 
*
* @extends InfoContributor
*/
class CliBuildInfoContributor extends InfoContributor {

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
        return "build"
    }

    getInfo() {
        return this.info.build
    }
}

module.exports = CliBuildInfoContributor